// @ts-check
const fs = require('fs');
const path = require('path');

const filesrc = path.join(__dirname, './src.txt');
const filedest = path.join(__dirname, `./dest-${Date.now()}.txt`);

(async () => {
  const readStream = fs.createReadStream(filesrc);
  const writeStream = fs.createWriteStream(filedest);

  try {
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      readStream.on('error', reject);
      readStream.pipe(writeStream);
    });

    console.log('done');
    console.log(await fs.promises.readdir(__dirname));
  } catch (err) {
    console.error(err);
  }
})();
