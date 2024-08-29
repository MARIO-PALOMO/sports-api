const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Match extends Model {
    static associate(models) {
      // Asociación con Competition
      this.belongsTo(models.Competition, {
        foreignKey: 'competition_id', // Clave foránea en la tabla Match
        as: 'competition', // Alias para la relación
      });

      // Asociación con Round
      this.belongsTo(models.Round, {
        foreignKey: 'round_id', // Clave foránea en la tabla Match
        as: 'round', // Alias para la relación
      });

      // Asociación con Team (Equipo de casa)
      this.belongsTo(models.Team, {
        foreignKey: 'home_team_id', // Clave foránea en la tabla Match
        as: 'homeTeam', // Alias para la relación
      });

      // Asociación con Team (Equipo visitante)
      this.belongsTo(models.Team, {
        foreignKey: 'away_team_id', // Clave foránea en la tabla Match
        as: 'awayTeam', // Alias para la relación
      });
      
      // Asociación con Schedule (Un partido puede tener varios horarios)
      this.hasOne(models.Schedule, {
        foreignKey: 'match_id', // Clave foránea en la tabla Schedule
        as: 'schedules', // Alias para la relación
      });

      // Asociación con Result (Un partido puede tener un único resultado)
      this.hasOne(models.Result, {
        foreignKey: 'match_id', // Clave foránea en la tabla Result
        as: 'result', // Alias para la relación
      });

      this.hasMany(models.Goal, {
        foreignKey: 'match_id',
        as: 'goals',
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
      validate: {
        notNull: {
          msg: 'El ID del equipo local es requerido',
        },
      },
    },
    away_team_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'teams',  // Reference to the Team table
        key: 'id',
      },
      validate: {
        notNull: {
          msg: 'El ID del equipo visitante es requerido',
        },
      },
    },
    competition_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'competitions',  // Reference to the Competitions table
        key: 'id',
      },
      validate: {
        notNull: {
          msg: 'El ID de la competición es requerido',
        },
      },
    },
    round_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rounds',  // Reference to the Round table
        key: 'id',
      },
      validate: {
        notNull: {
          msg: 'El ID de la ronda es requerido',
        },
      },
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
    validate: {
      // Validar que el equipo de casa y el equipo visitante no sean los mismos
      teamsDifferent() {
        if (this.home_team_id === this.away_team_id) {
          throw new Error('El equipo local y el equipo visitante no pueden ser el mismo');
        }
      },
    },
  });

  return Match;
};
