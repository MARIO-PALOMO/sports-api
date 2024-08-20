'use strict';

const { DataTypes } = require('sequelize');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      match_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'matches',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      field_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'fields',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      states_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('schedules');
  }
};
