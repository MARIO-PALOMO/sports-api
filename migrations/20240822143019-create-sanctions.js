'use strict';

const { DataTypes } = require('sequelize');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('sanctions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      player_id: {
        type: DataTypes.UUID,
        references: {
          model: 'players',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      sanction_type_id: {
        type: DataTypes.UUID,
        references: {
          model: 'sanction_types',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      match_id: {
        type: DataTypes.UUID,
        references: {
          model: 'matches',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sanctions');
  }
};
