// @ts-check
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://kolpak@localhost:5432/test',
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
