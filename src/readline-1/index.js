// @ts-check
const fs = require('fs');
const path = require('path');
const readline = require('readline');

{
  const filepath = path.join(__dirname, 'data.txt');
  fileToArray(filepath).then((arr) => console.log('cb', arr)).catch(console.error);
}

(async () => {
  const filepath = path.join(__dirname, 'data.txt');
  const arr = await fileToArray(filepath);
  console.log('async', arr);
})();

async function fileToArray(filepath) {
  const input = fs.createReadStream(filepath);
  const res = await new Promise((resolve, reject) => {
    const strings = [];
    const rl = readline.createInterface({
      input,
      crlfDelay: Infinity
    });
    rl.on('line', (line) => strings.push(line));
    rl.once('close', () => resolve(strings));
    rl.once('error', (err) => reject(err));
  });
  return res;
}
