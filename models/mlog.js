'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mlog.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    entity: DataTypes.STRING,
    method: DataTypes.STRING,
    error: DataTypes.STRING,
    payload: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mlog',
    tableName: 'log'
  });
  return mlog;
};