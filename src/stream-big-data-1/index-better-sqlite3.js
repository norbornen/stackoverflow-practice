/* eslint-disable no-use-before-define, implicit-arrow-linebreak, no-plusplus, max-len */
// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Database = require('better-sqlite3');

const db = new Database(':memory:');

// @ts-ignore
db.unsafeMode();
db.pragma('synchronous = off');
db.pragma('journal_mode = off');
db.pragma('auto_vacuum = NONE');
db.pragma('page_size = 8192');
db.pragma('cache_size = 10000');
db.exec('DROP TABLE IF EXISTS pairs');
db.exec('CREATE TABLE pairs (key VARCHAR(255), value VARCHAR(255))');
db.exec('create index idx_pair_key on pairs (key)');
// db.exec('create unique index idx_pair_uniq on pairs (key, value)');

const stmtPairInsert = db.prepare('INSERT INTO pairs (key, value) values (?, ?)');
const stmtPairSelect = db.prepare('select 1 as n from pairs where key = ? and value = ? limit 1');

(async () => {
  db.exec('BEGIN TRANSACTION');

  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  db.exec('END TRANSACTION');

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);

  db.close();

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
    if (line !== undefined && line !== null) {
      result.lines++;

      const isUnique = handleLine(line);

      if (isUnique === true) {
        result.uniq_pairs++;
      } else {
        result.doubles++;
      }
    }
    if (result.lines % 1000000 === 0) {
      console.log(result);
      console.log(`    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);
      if (result.lines >= 2000000) break;
    }
  }

  rl.close();

  const { n } = db.prepare('select count(*) as n from (SELECT 1 FROM pairs group by key) as foo').get();

  result.uniq_keys = n;

  return { ...result, time: (Date.now() - timeBegin) };
}

/**
 * @param {string} line
 * @returns {boolean}
 */
function handleLine(line) {
  const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);

  const n = stmtPairSelect.get(key, value);
  if (!n) {
    stmtPairInsert.run(key, value);
    return true;
  }

  return false;

  // try {
  //   stmtPairInsert.run(key, value);
  //   return { key, value };
  // } catch (err) {
  //   if (err) {
  //     if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
  //       return null;
  //     }
  //     console.error(err);
  //   }
  // }
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
