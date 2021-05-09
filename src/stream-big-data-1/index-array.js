// @ts-check
/**
 * --max_old_space_size=4096
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const mapKeysLimit = 2 ** 24;
const storage = [new Map()];

(async () => {
  const filepath = path.join(__dirname, 'generator', 'data.txt');
  const res = await handleFile(filepath);

  console.log(JSON.stringify(res, null, 2));
  console.log(`Время выполнения скрипта: ${formatDate(res.time)}`);
})();

/**
 * @param {string} filepath
 * @returns {Promise<{
 *   lines: number;
 *   doubles: number;
 *   uniq_keys: number;
 *   uniq_pairs: number;
 *   time: number;
 * }>}
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

      let currentMap = storage[storage.length - 1];
      if (currentMap.size === mapKeysLimit) {
        storage.push(currentMap = new Map());
      }

      const [key, value] = line.replace(/^\s+|\s+$/g, '').split(/: /);

      const uniqK = !checkKeyInStorage(key);
      result.uniq_keys += +uniqK;
      const uniqP = !checkPairInStorage(key, value);
      result.uniq_pairs += +uniqP;

      if (uniqP) {
        currentMap.set(key, value);
      } else {
        result.doubles++;
      }
    }
    if (result.lines % 1000000 === 0) {
      console.log(`[lines: ${result.lines}]    скрипт выполняется: ${formatDate(Date.now() - timeBegin)}`);
    }
  }

  rl.close();

  return { ...result, time: (Date.now() - timeBegin) };
}

/**
 * @param {string} key
 * @returns {boolean}
 */
function checkKeyInStorage(key) {
  return storage.some((map) => map.has(key));
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
function checkPairInStorage(key, value) {
  for (const map of storage) {
    if (value === map.get(key)) {
      return true;
    }
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
