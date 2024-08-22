'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sanctions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      player_id: {
        type: Sequelize.UUID,
        references: {
          model: 'players', // Referencia a la tabla 'rol'
          key: 'id',
        },
        allowNull: false, // Asegura que siempre haya un rol asociado
        onUpdate: 'CASCADE', // Actualización en cascada
        onDelete: 'SET NULL', // Establece NULL en caso de eliminación del rol asociado
      },
      sanction_type_id: {
        type: Sequelize.UUID,
        references: {
          model: 'sanction_types', 
          key: 'id',
        },
        allowNull: false, 
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', 
      },
      match_id: {
        type: Sequelize.UUID,
        references: {
          model: 'matches', // Referencia a la tabla 'rol'
          key: 'id',
        },
        allowNull: false, // Asegura que siempre haya un rol asociado
        onUpdate: 'CASCADE', // Actualización en cascada
        onDelete: 'SET NULL', // Establece NULL en caso de eliminación del rol asociado
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE
      },
      update_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sanctions');
  }
};