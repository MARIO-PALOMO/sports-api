const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      // Relación muchos a uno: Un horario (schedule) pertenece a un campo (field)
      this.belongsTo(models.Field, {
        foreignKey: 'field_id',  // Clave foránea en Schedule que apunta a Field
        as: 'field',             // Alias para la relación
      });

      // Relación muchos a uno: Un horario (schedule) pertenece a un estado (state)
      this.belongsTo(models.State, {
        foreignKey: 'states_id',
        as: 'state',
      });

      // Otras asociaciones necesarias
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match',
      });
    }
  }

  Schedule.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isTime: { msg: 'La hora de inicio debe ser una hora válida' },
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