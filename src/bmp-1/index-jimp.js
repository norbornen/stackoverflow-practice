// @ts-check
const path = require('path');
const fs = require('fs');
const jimp = require('jimp');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.jimp.bmp');

(async () => {
  const image = await jimp.read(filesrc);
  image.quality(0.5);
  image.grayscale();
  await image.write(filedest);

})();

// const bmpData = bmp.decode(
//   fs.readFileSync(filesrc)
// );

// fs.writeFileSync(
//   filedest,
//   bmp.encode(bmpData, 10).data
// );
