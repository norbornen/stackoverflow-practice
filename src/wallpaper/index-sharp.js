// @ts-check
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

sharp.cache(false);

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
  console.time('wallpaper-sharp');

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
  console.timeEnd('wallpaper-sharp');

  setTimeout(fn, 20);
})();

/**
 * @returns {Promise<Buffer>}
 */
async function makeFrame() {
  const image = sharp({
    create: {
      width: rect.width,
      height: rect.height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  });

  image.extend({
    ...rect.bb,
    background: { r: 255, g: 255, b: 255 }
  });

  image.png({
    compressionLevel: 1
  });

  return image.toBuffer();
}
