'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sanction_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sanction_types.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sanction_types',
  });
  return sanction_types;
};