// @ts-check
const path = require('path');
const gd = require('node-gd');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.gd.bmp');

(async () => {
  const img = await gd.openBmp(filesrc);
  img.grayscale();
  // img.saveAlpha(0);
  img.trueColorToPalette(0, 2);
  await img.saveBmp(filedest, 1);
  img.destroy();
})();
