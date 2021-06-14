// @ts-check
const path = require('path');
const sharp = require('sharp');

const filepath = path.join(__dirname, './EAN13code.bmp');
const q = sharp(filepath);
