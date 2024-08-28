'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Sanction extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      // Sanction.belongsTo(models.Player, { foreignKey: 'player_id' });
      // Sanction.belongsTo(models.Match, { foreignKey: 'match_id' });
      // Sanction.belongsTo(models.SanctionType, { foreignKey: 'sanction_type_id' });
    }
  }

  Sanction.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El ID del jugador no puede estar vacío' },
        isUUID: { args: 4, msg: 'Debe ser un UUID válido' },
      },
    },
    sanction_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El ID del tipo de sanción no puede estar vacío' },
        isUUID: { args: 4, msg: 'Debe ser un UUID válido' },
      },
    },
    match_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El ID del partido no puede estar vacío' },
        isUUID: { args: 4, msg: 'Debe ser un UUID válido' },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Sanction',
    tableName: 'sanctions'
  });

  return Sanction;
};
