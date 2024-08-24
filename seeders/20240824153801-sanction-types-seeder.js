'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sanction_types', [
      { id: uuidv4(), name: 'Tarjeta Blanca', description: 'Se utiliza para acciones de reconocimiento o fair play.', active: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Tarjeta Amarilla', description: 'Advertencia al jugador.', active: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Tarjeta Azul', description: 'Se utiliza para infracciones graves, menores a una roja.', active: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Tarjeta Roja', description: 'Expulsión del jugador.', active: true, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sanction_types', null, {});
  }
};
