// @ts-check
const path = require('path');
const gd = require('node-gd');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.gd.bmp');

(async () => {
  const img = await gd.create(500, 500);
  img.stringFT(
    img.colorAllocate(128, 128, 128),
    '/Users/kolpak/git/stackoverflow-practice/src/emoji-1/NotoEmoji-Regular.ttf',
    5,
    0,
    10,
    10,
    'dd'
  );
  await img.saveJpeg(
    path.join(__dirname, 'image-gd.jpg'),
    100
  );
  img.destroy();

})();
