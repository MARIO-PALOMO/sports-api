const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.State, {
        foreignKey: 'states_id',
        as: 'states',
      });
    }
  }

  Schedule.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    match_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'matches', // Nombre de la tabla de referencia
        key: 'id',
      },
      validate: {
        notNull: { msg: 'El ID del partido es requerido' },
        notEmpty: { msg: 'El ID del partido no puede estar vacío' },
      },
    },
    field_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'fields', // Nombre de la tabla de referencia
        key: 'id',
      },
      validate: {
        notNull: { msg: 'El ID del campo es requerido' },
        notEmpty: { msg: 'El ID del campo no puede estar vacío' },
      },
    },
    states_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'states', // Nombre de la tabla de referencia
        key: 'id',
      },
      validate: {
        notNull: { msg: 'El ID del estado es requerido' },
        notEmpty: { msg: 'El ID del estado no puede estar vacío' },
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: 'La hora de inicio debe ser una fecha válida' },
        notNull: { msg: 'La hora de inicio es requerida' },
      },
    }
  }, {
    sequelize,
    modelName: 'Schedule',       // Use PascalCase for model names
    tableName: 'schedules',       // Use snake_case for table names
  });

  return Schedule;
};
