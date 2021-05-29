// @ts-check
const path = require('path');
const fs = require('fs');
const { registerFont, createCanvas, loadImage } = require('canvas');

(async () => {
  const [width, height] = [635, 635];
  const nick = 'N3STLERQ';

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const image = await loadImage(path.join(__dirname, './bg.png'));
  ctx.drawImage(image, 0, 0);

  ctx.fillStyle = '#000000';
  ctx.font = '65.58px italic';
  ctx.fillText(nick, -30, -30, 320); // sorry for the shit code :D

  const pos = { x: 370, y: 410.5 };
  const textWidth = ctx.measureText(nick).width * 65.58;
  const textHeight = 78.83;
  console.log(ctx.measureText(nick));

  const gradient = ctx.createLinearGradient(0, 0, textWidth, textHeight);
  // gradient.addColorStop(0.5, 'white');
  // gradient.addColorStop(0.52, 'red');
  gradient.addColorStop(0, 'magenta');
  gradient.addColorStop(0.5, 'blue');
  gradient.addColorStop(1.0, 'red');

  ctx.fillStyle = gradient;
  ctx.font = '65.58px regular';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(nick, pos.x, pos.y, 320);

  const buffer = canvas.toBuffer(
    'image/png',
    {
      filters: 1,
    }
  );
  fs.writeFileSync('./image.png', buffer);

})();
