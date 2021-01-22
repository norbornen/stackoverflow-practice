const oracledb = require('oracledb');

const dbConfig = { user: 'db', password: 'db', connectString: 'db.home.kg:1721/pdb1.19c' };

(async () => await run())();

async function run() {
    let connection;

    try {

        let connection = await oracledb.getConnection(dbConfig);

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
