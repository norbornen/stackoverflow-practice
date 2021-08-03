// @ts-check
const path = require('path');
const fs = require('fs');
const { registerFont, createCanvas } = require('canvas');

registerFont(
  path.join(__dirname, 'NotoEmoji-Regular.ttf'),
  { family: 'Noto Emoji Regular' }
);
registerFont(
  path.join(__dirname, 'TwitterColorEmoji-SVGinOT-MacOS.ttf'),
  { family: 'Twitter Color Emoji' }
);

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

ctx.font = '12px "Twitter Color Emoji"';
ctx.fillText('Hi! 😁 \uF3E2 \u03A9 \u2139', 10, 50);

fs.writeFileSync(
  path.join(__dirname, 'image.png'),
  canvas.toBuffer('image/png')
);
