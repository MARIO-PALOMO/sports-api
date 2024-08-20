'use strict';

const { DataTypes } = require('sequelize');

/** 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      home_team_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      away_team_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      competition_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'competitions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      round_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'rounds',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      match_date: {
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
    await queryInterface.dropTable('matches');
  }
};
