// @ts-check
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const truefile = path.join(__dirname, 'image.png');
const tmpfile = path.join(__dirname, 'image.png.tmp');
const screen = {
  width: 1920,
  height: 1080,
};
const rect = {
  width: 150,
  height: 150,
  x: 0,
  y: 200
};

let fn;
(fn = async () => {
  console.time('wallpaper-sharp-composite');

  rect.bb = {
    top: rect.y,
    bottom: screen.height - rect.height - rect.y,
    left: rect.x,
    right: screen.width - rect.width - rect.x
  };

  const buf = await makeFrame();
  fs.writeFileSync(tmpfile, buf);
  fs.renameSync(tmpfile, truefile);

  rect.x = (rect.x + 1) % (screen.width - rect.width);
  console.timeEnd('wallpaper-sharp-composite');

  setTimeout(fn, 10);
})();

/**
 * @returns {Promise<Buffer>}
 */
async function makeFrame() {
  const image = sharp({
    create: {
      width: screen.width,
      height: screen.height,
      channels: 3,
      background: {r: 255, g: 255, b: 255}
    }
  });

  image.composite([{
    input: {
      create: {
        width: rect.width,
        height: rect.height,
        channels: 3,
        background: {r: 0, g: 0, b: 0}
      }
    },
    left: rect.bb.left,
    top: rect.bb.top
  }]);

  image.png({
    compressionLevel: 1
  });

  return image.toBuffer();
}
