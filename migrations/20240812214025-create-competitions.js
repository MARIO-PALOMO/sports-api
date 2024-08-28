'use strict';

const { DataTypes } = require('sequelize');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('competitions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 // Generación automática de UUIDs
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que el nombre no sea nulo
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true // Permite nulos si la descripción no siempre está disponible
      },
      organizer: {
        type: DataTypes.STRING,
        allowNull: true // Permite nulos si el organizador no siempre está disponible
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true // Permite nulos si la fecha de inicio no siempre está disponible
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true // Permite nulos si la fecha de finalización no siempre está disponible
      },
      logo_1: {
        type: DataTypes.TEXT,
        allowNull: true // Permite nulos si el logo no siempre está disponible
      },
      logo_2: {
        type: DataTypes.TEXT,
        allowNull: true // Permite nulos si el logo no siempre está disponible
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Asigna automáticamente la fecha y hora actuales
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Asigna automáticamente la fecha y hora actuales
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('competitions');
  }
};
