const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Round extends Model {
    static associate(models) {
      // Asociación con Match
      this.hasMany(models.Match, {
        foreignKey: 'round_id', // Clave foránea en la tabla Match
        as: 'matches', // Alias para la relación
      });
    }
  }

  Round.init({
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // El código debe ser único
      validate: {
        notEmpty: { msg: 'El código no puede estar vacío' },
        len: {
          args: [1, 50],  // Suponiendo un límite de longitud para el código
          msg: 'El código debe tener entre 1 y 50 caracteres',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Round',        // Use PascalCase for model names
    tableName: 'rounds',        // Use snake_case for table names
  });

  return Round;
};
