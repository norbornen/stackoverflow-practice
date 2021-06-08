// @ts-check
const fs = require('fs');
const stream = require('stream');
const path = require('path');
const { promisify } = require('util');

const filesrc = path.join(__dirname, './src.txt');
const filedest = path.join(__dirname, `./dest-${Date.now()}.txt`);

(async () => {
  const readStream = fs.createReadStream(filesrc);
  const writeStream = fs.createWriteStream(filedest);

  try {
    await promisify(stream.pipeline)(readStream, writeStream);

    console.log('done');
    console.log(await fs.promises.readdir(__dirname));
  } catch (err) {
    console.error(err);
  }
})();
