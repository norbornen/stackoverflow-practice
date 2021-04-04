// @ts-check
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const filepath = path.join(__dirname, 'datebases', 'трьч.db');
const db = new sqlite3.Database(filepath, sqlite3.OPEN_READONLY);

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

db.serialize(() => {
  for (let daynumber = 0; daynumber < week.length; daynumber += 1) {
    const tablename = week[daynumber];
    db.each(`SELECT rowid FROM ${tablename}`, (err, row) => {
      console.log(daynumber, tablename, err, row, row.rowid, row.id, row._8A);
    });

    // db.run(`CREATE TABLE ${tablename} (info TEXT)`);
    // db.run(`INSERT INTO ${tablename} (info) VALUES ('${Math.random()}')`);
    // db.run(`INSERT INTO ${tablename} (info) VALUES ('${Math.random()}')`);
  }
});
