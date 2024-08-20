const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Goal extends Model {
    static associate(models) {
    }
  }

  Goal.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    match_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'matches',
        key: 'id',
      },
      validate: {
        notEmpty: { msg: 'El ID del partido no puede estar vacío' },
      },
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'players',
        key: 'id',
      },
      validate: {
        notEmpty: { msg: 'El ID del jugador no puede estar vacío' },
      },
    }
  }, {
    sequelize,
    modelName: 'Goal',      // Use PascalCase for model names
    tableName: 'goals',      // Use snake_case for table names
  });

  return Goal;
};
