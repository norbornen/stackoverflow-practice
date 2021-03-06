/* eslint-disable no-use-before-define, implicit-arrow-linebreak, no-plusplus, max-len */
// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Database = require('better-sqlite3');

/** @type {Array<{ db: import('better-sqlite3').Database; stmtInsert: import('better-sqlite3').Statement; stmtSelect: import('better-sqlite3').Statement; }>} */
const tables = [];

(async () => {

  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  // db.exec('END TRANSACTION');

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);

  // db.close();

  try {
    // fs.unlinkSync(databasefile);
  } catch (err) { /**/ }
})();

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
  const rl = readline.createInterface({
    input: stream,
    output: process.stdout,
    crlfDelay: Infinity,
    terminal: false,
  });

  for await (const line of rl) {
    if (line === undefined || line === null) {
      continue;
    }

    if (result.lines % 1000000 === 0) {
      const { n = 0 } = tables[tables.length - 1]?.db.prepare('select count(*) as n from (SELECT 1 FROM pairs group by key) as foo').get() || {};

      result.uniq_keys += n;

      console.log(result);
      console.log(`    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);

      const db = new Database(':memory:'); // @ts-ignore
      db.unsafeMode();
      db.pragma('synchronous = normal');
      db.pragma('journal_mode = wal');
      db.pragma('auto_vacuum = NONE');
      db.pragma('page_size = 8192');
      db.pragma('cache_size = 10000');
      db.exec('CREATE TABLE pairs (key text, value text)');
      db.exec('create index idx_pairs_key on pairs (key)');
      db.exec('BEGIN TRANSACTION');
      tables.push({
        db,
        stmtInsert: db.prepare('INSERT INTO pairs (key, value) values (?, ?)'),
        stmtSelect: db.prepare('select 1 as n from pairs where key = ? and value = ? limit 1')
      });
    }

    const isUnique = await handleLine(line);

    if (isUnique === true) {
      result.uniq_pairs++;
    } else {
      result.doubles++;
    }
    result.lines++;
  }

  rl.close();

  return { ...result, time: (Date.now() - timeBegin) };
}

/**
 * @param {string} line
 * @returns {Promise<boolean>}
 */
async function handleLine(line) {
  const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);

  try {
    await Promise.all(tables.map(({ stmtSelect }) => {
      const res = stmtSelect.get(key, value);
      return res?.n > 0 ? Promise.reject() : Promise.resolve();
    }));
    tables[tables.length - 1].stmtInsert.run(key, value);
    return true;
  } catch (err) {
    if (err && err.code !== 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log(err);
    }
  }

  return false;
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
