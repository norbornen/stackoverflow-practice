// @ts-check
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
});

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/reg', (req, res) => {
  res.render('register');
});

app.post('/reg', urlencodedParser, (req, res) => {
  console.log(req.body);

  const sql = `INSERT INTO myuser(login, password) VALUES (?)`;
  const binds = [
    req.body.login,
    req.body.pass
  ];

  db.query(sql, [ binds ], (err, data, fields) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(data);
    console.log(fields);
    res.render('register', {});
  });  
});

app.listen(3003, 'localhost');
