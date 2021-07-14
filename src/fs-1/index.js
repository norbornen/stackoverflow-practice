// @ts-check
const fs = require('fs');
const path = require('path');

const path1800 = path.join(__dirname, '1800');
const dir = path.join(__dirname, '1999');

fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
  files.forEach((value) => {
    fs.readdir(path1800, (err1, file1) => {
      file1.forEach((value2) => {
        fs.rename(`${dir}/${value}`, `${path1800}/${value2}`, (err2) => {
          if (err2) {
            console.log(err2);
          }
        });
      });
    });
  });
});
