// @ts-check
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${process.env.POSTGRES_LOCAL_DBUSER}@localhost:5432/test2`,
  {
    logging: console.log
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    // await 
  } catch (err) {
    console.log(err);
  }
  await sequelize.close();
})();
