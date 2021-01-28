// @ts-check
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)');
  db.run('create unique index idx_lorem_info on lorem (info)');

  const keys = [];
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 51 * 1000 * 1000; i += 1) {
    const x = crypto.randomBytes(10).toString('base64');
    stmt.run(x);

    if (i % 1000000 === 0) {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`${i}    the script uses approximately ${Math.round(used * 100) / 100} MB`);
      keys.push(x);
    }
  }
  stmt.finalize();

  // db.each('SELECT count(1) FROM lorem', (err, row) => {
  //   console.log(row);
  // });

  console.log(keys);
  db.all(`SELECT * FROM lorem where info = '${keys[0]}')`, (err, rows) => {
    console.log(rows);
  });

  db.all(`SELECT * FROM lorem where info in(${keys.map((k) => `'${k}'`).join(',')})`, (err, rows) => {
    console.log(rows);
  });
});

db.close();
