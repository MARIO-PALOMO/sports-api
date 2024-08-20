const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Round extends Model {
    static associate(models) {
    }
  }

  Round.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    }
  }, {
    sequelize,
    modelName: 'Round',        // Use PascalCase for model names
    tableName: 'rounds',        // Use snake_case for table names
  });

  return Round;
};
