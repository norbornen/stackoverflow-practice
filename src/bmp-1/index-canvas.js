// @ts-check
const path = require('path');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.canvas.bmp');

(async () => {
  const image = await loadImage(filesrc);

  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  fs.writeFileSync(
    filedest,
    canvas.toBuffer('raw')
  );

})();

// const bmpData = bmp.decode(
//   fs.readFileSync(filesrc)
// );

// fs.writeFileSync(
//   filedest,
//   bmp.encode(bmpData, 10).data
// );
