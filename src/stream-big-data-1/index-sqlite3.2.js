/* eslint-disable no-use-before-define, implicit-arrow-linebreak, no-plusplus, max-len */
// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

/** @type { import('sqlite3').Statement } */
let stmtPairInsert;
/** @type { import('sqlite3').Statement } */
let stmtPairSelect;


db.parallelize(async () => {

  await new Promise((resolve, reject) =>
    db.run('pragma synchronous = off', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('pragma journal_mode = off', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('pragma auto_vacuum = NONE', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('pragma page_size = 8192', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('pragma cache_size = 10000', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('CREATE TABLE pairs (key TEXT, value TEXT)', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('create unique index idx_pair_uniq on pairs (key, value)', (err, ...args) => (err ? reject(err) : resolve(...args))));

  stmtPairInsert = db.prepare('INSERT INTO pairs (key, value) values (?, ?)');
  stmtPairSelect = db.prepare('select 1 as n from pairs where key = ? and value = ? limit 1');

  await new Promise((resolve, reject) =>
    db.exec('BEGIN TRANSACTION', (err, ...args) => (err ? reject(err) : resolve(...args))));

  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  await new Promise((resolve, reject) =>
    db.exec('END TRANSACTION', (err, ...args) => (err ? reject(err) : resolve(...args))));

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);

  await new Promise((resolve) => db.close(resolve));

  try {
    // fs.unlinkSync(databasefile);
  } catch (err) { /**/ }
});


/**
 * @param {string} filepath
 * @returns {Promise<{lines: number; doubles: number; uniq_keys: number; uniq_pairs: number; time: number; }>}
 */
async function handleFile(filepath) {
  const timeBegin = Date.now();

  const result = {
    lines: 0,
    doubles: 0,
    uniq_keys: 0,
    uniq_pairs: 0,
  };

  const stream = fs.createReadStream(filepath);

  // @ts-ignore
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    crlfDelay: Infinity,
    terminal: false,
  });

  const q = [];
  for await (const line of rl) {
    if (line !== undefined && line !== null) {
      result.lines++;

      const z = handleLine(line).then((uniq) => {
        if (uniq) {
          result.uniq_pairs++;
        } else {
          result.doubles++;
        }
      });
      q.push(z);
    }
    if (result.lines % 1000000 === 0) {
      console.log(result);
      console.log(`    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);
      break;
    }
  }
  await Promise.all(q);

  rl.close();

  const { n } = await new Promise((resolve, reject) =>
    db.get('select count(*) as n from (SELECT 1 FROM pairs group by key) as foo', (err, ...args) => (err ? reject(err) : resolve(...args))));

  result.uniq_keys = n;

  return { ...result, time: (Date.now() - timeBegin) };
}

/**
 * @param {string} line
 * @returns {Promise<boolean>}
 */
async function handleLine(line) {
  const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);

  const n = await new Promise((resolve, reject) => stmtPairSelect.get(
    [key, value],
    (err, ...args) => (err ? reject(err) : resolve(...args))
  ));
  if (!n) {
    await validatePair(key, value);
    return true;
  }
  return false;
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {Promise<void>}
 */
async function validatePair(key, value) {
  return new Promise((resolve, reject) => stmtPairInsert.run(
    [key, value],
    (err, ...args) => (err ? reject(err) : resolve(...args))
  ));
}

/**
 * @param {number} ms
 * @returns {string}
 */
function formatDate(ms) {
  const n = ms % 1000;
  const seconds = Math.trunc(ms / 1000);
  const h = Math.trunc(seconds / 3600);
  const s = seconds % 60;
  const m = ((seconds - s) % 3600) / 60;

  const str = [`${h}`.padStart(2, '0'), `${m}`.padStart(2, '0'), `${s}`.padStart(2, '0')].join(':');

  return `${str}.${`${n}`.padEnd(3, '0')}`;
}
