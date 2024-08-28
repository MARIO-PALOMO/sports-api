const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Competition extends Model {
    static associate(models) {
      this.hasMany(models.Match, {
        foreignKey: 'competition_id',
        as: 'matches',
      });
    }
  }

  Competition.init({
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
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El organizador no puede estar vacío' },
        len: {
          args: [1, 255],
          msg: 'El organizador debe tener entre 1 y 255 caracteres',
        },
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: 'La fecha de inicio debe ser una fecha válida' },
      },
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: 'La fecha de finalización debe ser una fecha válida' },
        isAfterStartDate(value) {
          if (this.start_date && value <= this.start_date) {
            throw new Error('La fecha de finalización debe ser después de la fecha de inicio');
          }
        },
      },
    },
    logo_1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_2: {
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
    modelName: 'Competition',
    tableName: 'competitions',
  });

  return Competition;
};
