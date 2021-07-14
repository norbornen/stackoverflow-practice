// @ts-check
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '1999');
const dstDir = path.join(__dirname, '1800');

const files = fs.readdirSync(srcDir);
files.forEach((file) => {
  fs.renameSync(
    path.join(srcDir, file),
    path.join(dstDir, file)
  );
});
