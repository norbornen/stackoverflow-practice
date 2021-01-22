// @ts-check
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataUrl = fs.readFileSync(path.join(__dirname, 'data'), {encoding: 'utf-8'});

const buf = Buffer.from(dataUrl.split(',')[1], 'base64');

const wb = XLSX.read(buf);

console.log(JSON.stringify(wb.Sheets, null, 2));
