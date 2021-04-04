const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`./datebases/трьч.db`, sqlite3.OPEN_READONLY);
const week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
db.serialize(() => {
  for (var ever = 0; ever < 6; ever++) {
    const t = week[ever];
    db.each(`SELECT rowid FROM ${t}`, (err, row) => {
      console.log(`${row.id} and ${row._8A}`, row, t);
    })
  }
});
