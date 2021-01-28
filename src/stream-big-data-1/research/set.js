// @ts-check
const crypto = require('crypto');

const sets = [new Set()];
for (let i = 0; i < 51000000; i += 1) {
  if (sets[sets.length - 1].size > 5000000) {
    sets.push(new Set());
  }

  const x = crypto.randomBytes(3).toString('base64');
  // console.log(x);
  sets[sets.length - 1].add(x);

  if (i % 1000000 === 0) {
    console.log(i, sets.length, ...sets.map((s) => s.size));

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }
}
console.log('done');

// 24000000 5 5000001 5000001 5000001 5000001 3999997
// The script uses approximately 2005.54 MB
