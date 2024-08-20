const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Result extends Model {
    static associate(models) {
    }
  }

  Result.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    match_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'matches', // Asegúrate de que esto coincida con el nombre de tu tabla
        key: 'id',
      },
      validate: {
        notNull: { msg: 'El ID del partido es requerido' },
        notEmpty: { msg: 'El ID del partido no puede estar vacío' },
      },
    },
    home_team_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: 'El puntaje del equipo local debe ser un número entero' },
        min: {
          args: [0],
          msg: 'El puntaje del equipo local no puede ser negativo',
        },
      },
    },
    away_team_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: 'El puntaje del equipo visitante debe ser un número entero' },
        min: {
          args: [0],
          msg: 'El puntaje del equipo visitante no puede ser negativo',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Result',       // Use PascalCase for model names
    tableName: 'results',       // Use snake_case for table names
  });

  return Result;
};
