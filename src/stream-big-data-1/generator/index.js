/* eslint-disable no-plusplus, no-param-reassign, no-use-before-define */
// @ts-check
const crypto = require('crypto');
// const fs = require('fs/promises');
const fs = require('fs');

const fd = fs.openSync(`${__dirname}/data.txt`, 'w+');
for (const str of generate(20000000)) {
  fs.appendFileSync(fd, str);
  fs.appendFileSync(fd, '\r\n');
}
fs.fsyncSync(fd);
for (const str of generate(20000000)) {
  fs.appendFileSync(fd, str);
  fs.appendFileSync(fd, '\r\n');
}
fs.fsyncSync(fd);
for (const str of generate(20000000)) {
  fs.appendFileSync(fd, str);
  fs.appendFileSync(fd, '\r\n');
}
fs.closeSync(fd);


// (async () => {
//   try {
//     const fh = await fs.open(`${__dirname}/data.txt`, 'w+');
//     for (const str of generate(10000000)) {
//       await fh.write(str);
//       await fh.write('\r\n');
//     }
//     await fh.sync();
//     await fh.close();
//   } catch (err) {
//     console.error(err);
//   }
// })();


/*
const stream = fs.createWriteStream(`${__dirname}/data.txt`, { highWaterMark: 100 });

stream.once('open', async () => {
  let pwrite = (str) => new Promise((resolve, reject) => {
    stream.write(str, (err) => (err ? reject(err) : resolve()));
  });
  for (const str of generate(10000000)) {
    await pwrite(str);
    await pwrite('\r\n');
  }
  // for (const str of generate(20000000)) {
  //   stream.write(str);
  // }
  // for (const str of generate(20000000)) {
  //   stream.write(str);
  // }
  pwrite = undefined;
  stream.end();
});
*/



/**
 * @param { number } size
 * @returns { string[] }
 */
function generate(size = 50 * 1000 * 1000) {
  let array = [];
  while (array.length < size) {
    const key = crypto.randomBytes(randomNumber(14, 25))
      .toString('base64').replace(/={1,}$/, '');

    for (let i = 0; i < randomNumber(3, 5); i++) {
      const value = crypto.randomBytes(randomNumber(4, 8)).toString('base64');
      const line = `${key}: ${value}`;
      array.push(line);
      if (i % 2 !== 0) {
        array.push(line);
      }
    }
    if (array.length >= 1000000 && array.length % 1000000 < 10) {
      console.log(array.length);
    }
  }
  array = shuffle(array);
  return array;
}

/**
 * @param {number} [min=0]
 * @param {number} [max]
 * @returns {number}
 */
function randomNumber(min = 0, max) {
  if (max === null || max === undefined) {
    max = min; min = 0;
  }
  return Math.trunc(Math.random() * (max - min) + min);
}

/**
 * @param { any[] } array
 * @returns { any[] }
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
