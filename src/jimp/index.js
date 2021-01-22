// @ts-check
const jimp = require('jimp');

(async () => {

  const img = await jimp.read(`${__dirname}/q.png`);
  for (const { x, y, idx } of img.scanIterator(0, 0, img.bitmap.width, img.bitmap.height)) {
    const colorHex = img.getPixelColor(x, y);
    const colorRgba = jimp.intToRGBA(colorHex);
    console.log(`x=${x}, y=${y}:    colorHex=${colorHex}, colorRgba=${JSON.stringify(colorRgba)}`);
  }

})();
