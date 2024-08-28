'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const rounds = [
      { id: uuidv4(), name: 'Eliminación Directa 64 Equipos', code: 'ED64', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Eliminación Directa 32 Equipos', code: 'ED32', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Octavos de Final', code: 'ED18', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Cuartos de Final', code: 'ED08', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Semifinales', code: 'ED04', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Final', code: 'ED02', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('rounds', rounds, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('rounds', null, {});
  }
};
