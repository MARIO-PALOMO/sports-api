'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sanctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //sanctions.belongsTo(models.players, { foreignKey: 'player_id' });
      //sanctions.belongsTo(models.matches, { foreignKey: 'match_id' });
      //sanctions.belongsTo(models.sanction_types, { foreignKey: 'sanction_type_id' });
    }
  }
  sanctions.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    player_id: DataTypes.UUID,
    sanction_type_id: DataTypes.UUID,
    match_id: DataTypes.UUID,
    active: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sanctions',
  });
  return sanctions;
};