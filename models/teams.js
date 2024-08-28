const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Team extends Model {
    static associate(models) {
      // Relación uno a muchos: Un equipo tiene muchos jugadores
      this.hasMany(models.Player, {
        foreignKey: 'team_id',  // La clave foránea en el modelo Player que apunta al equipo
        as: 'players',          // Alias para la relación
      });
      
      // Relación uno a muchos: Un equipo puede ser el equipo local en muchos partidos
      this.hasMany(models.Match, {
        foreignKey: 'home_team_id',
        as: 'homeMatches',
      });

      // Relación uno a muchos: Un equipo puede ser el equipo visitante en muchos partidos
      this.hasMany(models.Match, {
        foreignKey: 'away_team_id',
        as: 'awayMatches',
      });
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
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Team',           // Usa PascalCase para los nombres de los modelos
    tableName: 'teams',           // Usa snake_case para los nombres de las tablas
  });

  return Team;
};
