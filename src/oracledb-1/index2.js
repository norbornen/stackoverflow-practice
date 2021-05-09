const dotenv = require('dotenv');
const oracledb = require('oracledb');

dotenv.config();

const dbConfig = {
  user: process.env.ORACLE_DB_USER,
  password: process.env.ORACLE_DB_PASSWORD,
  connectString: process.env.ORACLE_DB_CONNECT_STRING
};

(async () => run())();

async function run() {
  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    const sql = `
            begin
                get_data_info(:p_ticker,:p_acronym,:p_sort,:p_call_source,:p_data);
            end;`;
    const binds = {
      p_ticker: 'AAPL',
      p_data: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
      p_acronym: undefined,
      p_sort: undefined,
      p_call_source: undefined
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const result = await connection.execute(sql, binds, options);

    const resultSet = result.outBinds.p_data;

    let row;
    while (row = await resultSet.getRow()) {
      console.log(row);
    }

    await resultSet.close();

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
}
