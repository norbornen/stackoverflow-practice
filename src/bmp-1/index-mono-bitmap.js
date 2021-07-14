// @ts-check
const path = require('path');
const bitmapManipulation = require('bitmap-manipulation');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.gd.bmp');

(async () => {
  let bitmap = new bitmapManipulation.BMPBitmap(1200, 500);
  let overlayBitmap = bitmapManipulation.BMPBitmap.fromFile(filedest);
  console.log(bitmap);
  console.log(overlayBitmap);
})();
