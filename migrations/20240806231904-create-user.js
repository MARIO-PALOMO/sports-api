'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      rol_id: {
        type: DataTypes.UUID,
        references: {
          model: 'rol', // Referencia a la tabla 'rol'
          key: 'id',
        },
        allowNull: false, // Asegura que siempre haya un rol asociado
        onUpdate: 'CASCADE', // Actualización en cascada
        onDelete: 'SET NULL', // Establece NULL en caso de eliminación del rol asociado
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Asegura que el nombre no sea nulo
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false, // Asegura que el correo no sea nulo
        unique: true, // Asegura que el correo sea único
        validate: {
          isEmail: true, // Validación de formato de correo electrónico
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Asegura que la contraseña no sea nula
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true, // La foto puede ser nula
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Asegura que el estado activo no sea nulo
        defaultValue: true, // Valor por defecto para 'active'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Fecha de creación por defecto
        allowNull: false, // Asegura que la fecha de creación no sea nula
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Fecha de actualización por defecto
        allowNull: false, // Asegura que la fecha de actualización no sea nula
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
