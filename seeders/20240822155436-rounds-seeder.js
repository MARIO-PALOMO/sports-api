'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rounds = [
      { id: uuidv4(), name: 'Eliminación Directa 64 Equipos', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Eliminación Directa 32 Equipos', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Octavos de Final', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Cuartos de Final', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Semifinales', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Final', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('rounds', rounds, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rounds', null, {});
  }
};
