// @ts-check
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${process.env.POSTGRES_LOCAL_DBUSER}@localhost:5432/test`,
  {
    logging: console.log
  }
);

(async () => {
  try {
    await sequelize.authenticate();

    // Models
    const User = sequelize.define('user', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING }
    });

    const Role = sequelize.define('role', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      value: { type: DataTypes.STRING, unique: true }
    });

    const UserRoles = sequelize.define('user_roles', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    });

    User.belongsToMany(Role, { through: UserRoles });
    Role.belongsToMany(User, { through: UserRoles, as: 'roles' });

    // Sync Tables
    await sequelize.sync({ force: true });

    // Data creation
    const role = await Role.create({ value: 'ADMIN' });
    const user = await User.create({ email: 'example@example.com' });
    const userRoleMap = await UserRoles.create({
      userId: user.id,
      roleId: role.id,
    });
    const user2 = await User.create(
      {
        email: 'a',
        Role: [role.id]
      },
      {
        include: [Role]
      }
    );

    // Data select
    const candidate = await User.findOne({
      where: { email: user.email },
      include: {
        model: Role
      }
    });
    console.log(user.email, candidate);


  } catch (err) {
    console.log(err);
  }
  await sequelize.close();
})();
