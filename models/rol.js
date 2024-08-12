'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rol.hasMany(models.user, { foreignKey: 'rol_id' })
    }
  }
  rol.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'rol',
  });
  return rol;
};