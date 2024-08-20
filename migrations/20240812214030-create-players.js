'use strict';

const { DataTypes } = require('sequelize');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 // Generación automática de UUIDs
      },
      team_id: {
        type: DataTypes.UUID,
        allowNull: true, // Permite nulos si no se requiere un equipo para cada jugador
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false // Asegura que el nombre no sea nulo
      },
      document_number: {
        type: DataTypes.STRING,
        allowNull: true // Permite nulos si no siempre hay un número de documento
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true // Permite nulos si la fecha de nacimiento no siempre está disponible
      },
      player_number: {
        type: DataTypes.STRING,
        allowNull: true // Permite nulos si el número del jugador no siempre está disponible
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Asigna un valor por defecto para indicar si el jugador está activo
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true // Permite nulos si no siempre hay una foto
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
    await queryInterface.dropTable('players');
  }
};
