'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SanctionType extends Model {
    static associate(models) {
      // Definir asociaciones aquí si es necesario
      // Ejemplo: SanctionType.hasMany(models.Sanction, { foreignKey: 'sanction_type_id' });
    }
  }

  SanctionType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío' },
        len: {
          args: [1, 255],
          msg: 'El nombre debe tener entre 1 y 255 caracteres',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'La descripción debe tener hasta 500 caracteres',
        },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'SanctionType',
    tableName: 'sanction_types'
  });

  return SanctionType;
};
