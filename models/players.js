const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Player extends Model {
    static associate(models) {
      //// Un jugador pertenece a un equipo
      // this.belongsTo(models.Team, {
      //   foreignKey: 'team_id',
      //   as: 'team',
      // });
    }
  }

  Player.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'teams', // Nombre de la tabla en la base de datos
        key: 'id',
      },
      validate: {
        notNull: { msg: 'El ID del equipo es requerido' },
        notEmpty: { msg: 'El ID del equipo no puede estar vacío' },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El nombre es requerido' },
        notEmpty: { msg: 'El nombre no puede estar vacío' },
        len: {
          args: [1, 100], // Longitud máxima de 100 caracteres
          msg: 'El nombre debe tener entre 1 y 100 caracteres',
        },
      },
    },
    document_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El número de documento es requerido' },
        notEmpty: { msg: 'El número de documento no puede estar vacío' },
        isAlphanumeric: { msg: 'El número de documento solo puede contener letras y números' },
      },
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La fecha de nacimiento es requerida' },
        isDate: { msg: 'La fecha de nacimiento debe ser una fecha válida' },
      },
    },
    player_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El número de jugador es requerido' },
        notEmpty: { msg: 'El número de jugador no puede estar vacío' },
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Player',       // Use PascalCase for model names
    tableName: 'players',       // Use snake_case for table names
  });

  return Player;
};
