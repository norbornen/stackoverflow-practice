// @ts-check
require('dotenv').config();
const oracledb = require('oracledb');


(async () => {
  /** @type { import('oracledb').Connection } */
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectString: process.env.ORACLE_DB_CONNECT_STRING
    });

    const { rows: items } = await connection.execute(
      `SELECT department_id, department_name
        FROM hr.departments WHERE department_id > :id`,
      [100],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        maxRows: 2
      }
    );

    console.log(items);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
})();
