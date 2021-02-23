/* eslint-disable no-use-before-define, implicit-arrow-linebreak, no-plusplus, max-len */
// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

const databasefile = path.join(__dirname, 'sqlite.db');
const db = new sqlite3.Database(':memory:');

db.serialize(async () => {
  await initDatabase();

  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);

  await new Promise((resolve) => db.close(resolve));

  try {
    fs.unlinkSync(databasefile);
  } catch (err) {}
});

/**
 * @returns {Promise<void>}
 */
async function initDatabase() {
  // await new Promise((resolve, reject) =>
  //   db.run('pragma synchronous = off;', (err, ...args) => (err ? reject(err) : resolve(...args))));
  await new Promise((resolve, reject) =>
    db.run('pragma journal_mode = MEMORY;', (err, ...args) => (err ? reject(err) : resolve(...args))));
  // await new Promise((resolve, reject) =>
  //   db.run('pragma auto_vacuum = NONE;', (err, ...args) => (err ? reject(err) : resolve(...args))));

  await new Promise((resolve, reject) =>
    db.run('DROP TABLE IF EXISTS pairs', (err, ...args) => (err ? reject(err) : resolve(...args))));

  await new Promise((resolve, reject) =>
    db.run('CREATE TABLE pairs (key TEXT, value TEXT)', (err, ...args) => (err ? reject(err) : resolve(...args))));

  await new Promise((resolve, reject) =>
    db.run('create unique index idx_pair_uniq on pairs (key, value)', (err, ...args) => (err ? reject(err) : resolve(...args))));
}

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

  for await (const line of rl) {
    if (line !== undefined && line !== null) {
      result.lines++;
      try {
        await handleLine(line);
        result.uniq_pairs++;
      } catch (err) {
        if (err && err.code === 'SQLITE_CONSTRAINT') {
          result.doubles++;
        } else {
          console.error(err);
        }
      }
    }
    if (result.lines % 1000000 === 0) {
      console.log(result);
      console.log(`    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);
    }
  }

  rl.close();

  const { n } = await new Promise((resolve, reject) =>
    db.get('SELECT count(distinct(key)) as n FROM pairs', (err, ...args) => (err ? reject(err) : resolve(...args))));

  result.uniq_keys = n;

  return { ...result, time: (Date.now() - timeBegin) };
}

/**
 * @type { import('sqlite3').Statement }
 */
let pairInsertStatement;

/**
 * @param {string} line
 * @returns {Promise<{ key: string; value: string; }>}
 */
async function handleLine(line) {
  const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);

  if (!pairInsertStatement) {
    pairInsertStatement = db.prepare('INSERT INTO pairs (key, value) values (?, ?)');
  }

  await new Promise((resolve, reject) => pairInsertStatement.run(
    [key, value],
    (err, ...args) => (err ? reject(err) : resolve(...args))
  ));

  return { key, value };
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
