// @ts-check
const crypto = require('crypto');

const object = {};
for (let i = 0; i < 51000000; i += 1) {
  const x = crypto.randomBytes(10).toString('base64');
  const k1 = x.substr(0, 2);
  const k2 = x.substr(2, 2);
  if (!(k1 in object)) {
    object[k1] = {};
  }
  if (!(k2 in object[k1])) {
    object[k1][k2] = {};
  }
  object[k1][k2][x] = 123;

  if (i % 1000000 === 0) {
    console.log(i);
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }
}
console.log('done');
