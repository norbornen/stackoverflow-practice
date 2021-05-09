// @ts-check
const path = require('path');
const fs = require('fs');
const { registerFont, createCanvas, loadImage } = require('canvas');

registerFont(
  path.join(__dirname, 'FSElliotPro.ttf'),
  { family: 'FSHeavy' }
);

const data = { nick: 'stackoverflow' };
const width = 2000;
const height = 1200;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 2000, 1200);

ctx.fillStyle = '#ffffff';
ctx.font = '128px FSHeavy';
ctx.fillText(data.nick, 450, 350);

const buffer = canvas.toBuffer(
  'image/png',
  {
    filters: 1,
  }
);
fs.writeFileSync('./image.png', buffer);
