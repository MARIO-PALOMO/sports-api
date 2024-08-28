'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const date = new Date();
    const statesData = [
      { id: uuidv4(), name: 'Pendiente', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'En Juego', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Finalizado', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'No Realizado', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Ganado', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Perdido', createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Empatado', createdAt: date, updatedAt: date },
    ];
    await queryInterface.bulkInsert('states', statesData, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
