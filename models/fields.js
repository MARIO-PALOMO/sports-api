const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Field extends Model {
    static associate(models) {
    }
  }

  Field.init({
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
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 255],
          msg: 'La ubicación debe tener entre 0 y 255 caracteres',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Field',     // Use PascalCase for model names
    tableName: 'fields',     // Use snake_case for table names
  });

  return Field;
};
