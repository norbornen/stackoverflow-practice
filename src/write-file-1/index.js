// @ts-check
const fs = require('fs');
const stream = fs.createWriteStream('foo.txt');
stream.once('open', () => {
  stream.write('hello world');
  stream.write(`${Date.now()}`);
  stream.end();
});
