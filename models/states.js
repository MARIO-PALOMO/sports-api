const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class State extends Model {
    static associate(models) {
      // Relación uno a muchos: Un estado tiene muchos horarios (schedules)
      this.hasMany(models.Schedule, {
        foreignKey: 'states_id',  // Clave foránea en Schedule que apunta a State
        as: 'schedules',         // Alias para la relación
      });
    }
  }

  State.init({
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
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El color no puede estar vacío' }
      }
    }
  }, {
    sequelize,
    modelName: 'State',       // Use PascalCase for model names
    tableName: 'states',       // Use snake_case for table names
  });

  return State;
};
