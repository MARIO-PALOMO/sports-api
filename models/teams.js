const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Team extends Model {
    static associate(models) {
    }
  }

  Team.init({
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
    coach: {
      type: DataTypes.STRING,
      allowNull: true, // Campo opcional; ajustar si es necesario
      validate: {
        len: {
          args: [1, 255],
          msg: 'El nombre del entrenador debe tener entre 1 y 255 caracteres',
        },
      },
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Team',           // Usa PascalCase para los nombres de los modelos
    tableName: 'teams',           // Usa snake_case para los nombres de las tablas
  });

  return Team;
};
