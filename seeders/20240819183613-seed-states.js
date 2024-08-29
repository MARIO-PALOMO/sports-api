'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const date = new Date();
    const statesData = [
      { id: uuidv4(), name: 'Pendiente', color:"#040AB8", createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'En Juego', color:"#FFAE00", createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Finalizado', color:"#00D13B", createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'No Realizado', color:"#AD0303", createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Ganado', color:"#34A853", createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Perdido', color:"#EA4435" , createdAt: date, updatedAt: date },
      { id: uuidv4(), name: 'Partido Empatado', color:"#9D9BA7", createdAt: date, updatedAt: date },
    ];
    await queryInterface.bulkInsert('states', statesData, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('states', null, {});
  }
};
