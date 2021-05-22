// @ts-check
const { DataTypes } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {Promise<void>}
 */
async function schema(sequelize) {
  const Privazka = sequelize.define(
    'lc_privazka',
    {
      geom: DataTypes.GEOMETRY,
      coordinates: DataTypes.STRING,
      id_lc: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    }
  );

  const Geo = sequelize.define(
    'lc_geo',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      azimuth: DataTypes.STRING,
      coordinate_x: DataTypes.STRING,
      coordinate_y: DataTypes.STRING,
      direction_angle: DataTypes.STRING,
      horizontal_distance: DataTypes.STRING,
      rhumb: DataTypes.STRING,
      slant_distance: DataTypes.STRING,
      vertical_angle: DataTypes.STRING,
      is_binding_line: DataTypes.BOOLEAN,
      id_lc: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
    }
  );

  const MainInfo = sequelize.define(
    'lc_info',
    {
      code_lesxoz: DataTypes.INTEGER,
      code_plxo: DataTypes.INTEGER,
      code_lestichestva: DataTypes.INTEGER,
      number_vided: DataTypes.INTEGER,
      number_kvartala: DataTypes.INTEGER,
      number_region: DataTypes.INTEGER,
      number_lesoseka: DataTypes.INTEGER,
      x_center: DataTypes.STRING,
      y_scenter: DataTypes.STRING,
      id_lc: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    }
  );

  MainInfo.hasMany(Podlesok);
  MainInfo.hasMany(Podrostok);
  MainInfo.hasMany(Jnp);

  /*    db.MainInfo.hasOne(db.Privazka)
      db.MainInfo.hasOne(db.Lesoseka)
  */
  Privazka.hasOne(Geo);
  Lesoseka.hasOne(Geo);

}

module.exports = schema;
