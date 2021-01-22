// @ts-check
const path = require('path');
const fs = require('fs');
const wallpaper = require('wallpaper');

const { Canvas } = require('canvas');

const canvas = new Canvas(1920, 1080);
const ctx = canvas.getContext('2d');

let pos = 0;
setInterval(() => {
  console.time('wallpaper-canvas');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = 'black';
  ctx.fillRect(pos, 200, 150, 150);

  pos = (pos + 1) % 1920;

  const buffer = canvas.toBuffer('image/png', {
    compressionLevel: 1,
    filters: 1,
  });
  fs.writeFileSync(path.join(__dirname, 'image.png'), buffer);
  console.timeEnd('wallpaper-canvas');


  //  const z = canvas.createJPEGStream({ compressionLevel: 1 });
  // const z = canvas.createPNGStream({ compressionLevel: 1, filters: 1 });
  // const zz = fs.createWriteStream(path.join(__dirname, 'image.png.tmp'));
  // z.pipe(zz);
  // z.on('end', () => {
  //   // z.destroy();
  //   // zz.destroy();
  //   console.log(1);
  //   console.timeEnd('wallpaper-canvas');
  // });
  // zz.on('finish', () => fs.renameSync(path.join(__dirname, 'image.png.tmp'), path.join(__dirname, 'image.png')));


  // wallpaper.set("./image.png");
}, 1000 / 60);
