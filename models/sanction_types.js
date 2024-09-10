'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SanctionType extends Model {
    static associate(models) {
      // Relación de uno a muchos con el modelo Sanction
      this.hasMany(models.Sanction, {
        foreignKey: 'sanction_type_id',
        as: 'sanctions',
      });
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
        notEmpty: {
          msg: 'El nombre no puede estar vacío',
        },
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
    logo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // El código debe ser único
      validate: {
        notEmpty: { msg: 'El código no puede estar vacío' },
        len: {
          args: [1, 50],  // Suponiendo un límite de longitud para el código
          msg: 'El código debe tener entre 1 y 50 caracteres',
        },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'SanctionType',
    tableName: 'sanction_types'
  });

  return SanctionType;
};
