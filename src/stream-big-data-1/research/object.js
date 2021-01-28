// @ts-check
const crypto = require('crypto');

const object = {};
for (let i = 0; i < 51000000; i += 1) {
  object[crypto.randomBytes(30).toString('base64')] = 123;

  if (i % 1000000 === 0) {
    console.log(i);
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }
}
console.log('done');

// 8000000
// The script uses approximately 1103.56 MB


