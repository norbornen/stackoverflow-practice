// @ts-check
const path = require('path');
const fs = require('fs');
const needle = require('needle');

const filepath = path.join(__dirname, 'spreadsheet.html');
const fileStream = fs.createWriteStream(filepath);
const spreadsheetsStream = needle.get(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQXRLX-aofeNtFqYUdnZEmOFmyW2mCjpOaoqLzpUPn1mKhLjDaLRXA3XjRXWpxWyXKMumMPOZ0cvnOu/pubhtml?gid=1239914093&single=true'
);
spreadsheetsStream.on('error', console.error);
fileStream.on('error', console.error);

spreadsheetsStream.pipe(fileStream);
