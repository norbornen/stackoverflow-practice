// @ts-chech
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'sqlserver.local',
  user: 'root',
  database: 'node_users',
  password: 'password',
});

connection.connect((err) => {
  if (err) {
    return console.error(`Ошибка: ${err.messsage}`);
  }
  console.log('Connected to MySQL');
});

connection.end((err) => {
  if (err) {
    return console.log(`Ошибка выхода: ${err.message}`);
  }
  console.log('Подключение закрыто');
});


module.exports.createTable = ((req, res) => {
  const sql = `create table users (
    id int AUTO_INCREMENT,
    fullname VARCHAR (255),
    address VARCHAR (255),
    PRIMARY KEY(id)
  )`;
  connection.query = (sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('USERS created');
  });
});
