import * as OracleDB from 'OracleDB';

const dbConfig: OracleDB.ConnectionAttributes = {
    user: 'db',
    password: 'db',
    connectString: 'db.home.kg:1721/pdb1.19c'
};

class ConnectDAO {
    public async ConnectionDB(): Promise<OracleDB.Connection> {
        return OracleDB.getConnection(dbConfig);
    }
    public async fetchData<T>(
        connection: OracleDB.Connection,
        sql: string,
        bindParams: OracleDB.BindParameters = {},
        options: OracleDB.ExecuteOptions = {}
    ): Promise<OracleDB.Result<T>> {
        return connection.execute<T>(sql, bindParams, options);
    }
}

async function connectAndExecute() {
    let connectDao = new ConnectDAO();
    try {
        const connection = await connectDao.ConnectionDB();
        
        const sql = `
        begin
            get_data_info(:p_ticker,:p_acronym,:p_sort,:p_call_source,:p_data);
        end;`;

        const binds: OracleDB.BindParameters = {
            p_ticker: 'AAPL',
            p_acronym: undefined,
            p_sort: undefined,
            p_call_source: undefined,
            p_data: {
                dir: OracleDB.BIND_OUT,
                type: OracleDB.CURSOR
            }
        };

        const options: OracleDB.ExecuteOptions = {
            outFormat: OracleDB.OUT_FORMAT_OBJECT
        };

        const results = await connectDao.fetchData<{p_data: OracleDB.ResultSet<Record<string, any>>}>(connection, sql, binds, options);

        const resultSet = results.outBinds.p_data;

        let row: Record<string, any>;
        while (row = await resultSet.getRow()) {
          console.log(row);
        }

        await resultSet.close();
        await connection.close();
    } catch (err) {
        console.log(`error caught ${err}`);
    }
}

connectAndExecute();
