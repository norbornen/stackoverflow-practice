// @ts-check
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

(async () => {
  const text = 'Gradient';
  const output = './image.png';

  const [width, height] = [280, 220];
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.font = '30px Verdana';
  console.log(context.measureText(text));
  
  // const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  // gradient.
  // gradient.addColorStop(0, '#004');
  // gradient.addColorStop(0.5, '#00fef3');
  // context.fillStyle = gradient;
  context.fillText(text, 10, 10);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(output, buffer);
})();
