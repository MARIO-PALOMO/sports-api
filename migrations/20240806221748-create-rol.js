'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('rol', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Asegura que el nombre no sea nulo
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Asegura que el estado activo no sea nulo
        defaultValue: true, // Proporciona un valor por defecto si se necesita
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rol');
  },
};
