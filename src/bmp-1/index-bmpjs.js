// @ts-check
const path = require('path');
const fs = require('fs');
const bmp = require('bmp-js');

const filesrc = path.join(__dirname, './EAN13code.bmp');
const filedest = path.join(__dirname, './EAN13code.bmpjs.bmp');

const bmpData = bmp.decode(
  fs.readFileSync(filesrc)
);

fs.writeFileSync(
  filedest,
  bmp.encode(bmpData, 10).data
);
