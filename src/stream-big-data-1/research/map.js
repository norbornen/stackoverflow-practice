// @ts-check
const crypto = require('crypto');

const maps = [new Map()];
for (let i = 0; i < 51000000; i += 1) {
  if (maps[maps.length - 1].size > 5000000) {
    maps.push(new Map());
  }

  maps[maps.length - 1].set(crypto.randomBytes(17).toString('base64'), 1234);

  if (i % 1000000 === 0) {
    console.log(i, maps.length, ...maps.map((s) => s.size));

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }
}
console.log('done');

// 24000000 5 5000001 5000001 5000001 5000001 3999997
// The script uses approximately 1936.94 MB
