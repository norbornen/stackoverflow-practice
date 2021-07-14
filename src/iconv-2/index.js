// @ts-check
const fs = require('fs');
const iconv = require('iconv').Iconv;

const converter = iconv('utf8', 'cp1251');
const data = 'Привет!';

fs.writeFileSync(`${__dirname}/utf8.txt`, data);
fs.writeFileSync(`${__dirname}/cp1251.txt`, converter.convert(data));
