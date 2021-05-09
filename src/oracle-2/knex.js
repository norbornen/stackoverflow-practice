// @ts-check
require('dotenv').config();
const { default: Knex } = require('knex');

(async () => {
  /** @type { import('knex').Knex } */
  let knex;

  try {
    knex = await Knex({
      client: 'oracledb',
      connection: {
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectString: process.env.ORACLE_DB_CONNECT_STRING
      },
      wrapIdentifier: (value, origImpl) => origImpl(value.toUpperCase())
    });

    const qb = knex.queryBuilder()
      .table('departments').withSchema('hr')
      .where('department_id', '>', 100)
      .select(['department_id', 'department_name'])
      .limit(2);
    const items = await qb.select();

    console.log(items);

  } catch (err) {
    console.error(err);
  } finally {
    if (knex) {
      try {
        await knex.destroy();
      } catch (err) {
        console.error(err);
      }
    }
  }
})();
