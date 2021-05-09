/* eslint-disable no-use-before-define, implicit-arrow-linebreak, no-plusplus, max-len, import/no-unresolved */
// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const levelup = require('levelup');
const leveldown = require('leveldown');

const databasefile = path.join(__dirname, 'level.db');
const db = levelup(
  leveldown(databasefile, {
    compression: false,
    cacheSize: 1 * 1024 * 1024 * 1024,
    writeBufferSize: 80 * 1024 * 1024
  })
);


(async () => {

  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);

  await db.close();

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

      const pair = await handleLine(line);

      if (pair) result.uniq_pairs++;
      if (pair === null) result.doubles++;
    }
    if (result.lines % 1000000 === 0) {
      console.log(result);
      console.log(`    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);
    }
  }

  rl.close();

  // const { n } = await new Promise((resolve, reject) =>
  //   db.get('SELECT count(distinct(key)) as n FROM pairs', (err, ...args) => (err ? reject(err) : resolve(...args))));

  result.uniq_keys = -1;

  return { ...result, time: (Date.now() - timeBegin) };
}

const buuf = Buffer.from('00', 'hex');
/**
 * @param {string} line
 * @returns {Promise<{ key: string; value: string; } | null>}
 */
async function handleLine(line) {
  const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);
  // const leveldbkey = Buffer.concat([Buffer.from(key), buuf, Buffer.from(value)]);
  // await Promise.allSettled([db.get(line), db.get(key), db.put(line, buuf), await db.put(key, buuf)]);


  try {
    await db.get(line); // leveldbkey
  } catch (err) {
    if (err.notFound) {
      await db.put(line, buuf); // leveldbkey
      return { key, value };
    }
    console.error(err);
    return null;
  }
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
