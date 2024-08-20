const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.Competition, {
        foreignKey: 'competition_id', // Clave foránea en la tabla Match
        as: 'competition', // Alias para la relación
      });
    }
  }

  Match.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,  // Set default UUID value
    },
    home_team_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'teams',  // Reference to the Team table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    away_team_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'teams',  // Reference to the Team table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    competition_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'competitions',  // Reference to the Competitions table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    round_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rounds',  // Reference to the Round table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    match_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: 'La fecha del partido debe ser una fecha válida' },  // Ensure match_date is a valid date
        notNull: {
          msg: 'La fecha del partido es requerida',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Match',  // Use PascalCase for model names
    tableName: 'matches',  // Use snake_case for table names
  });

  return Match;
};
