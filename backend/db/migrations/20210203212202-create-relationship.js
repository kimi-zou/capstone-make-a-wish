'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Relationships', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      actionUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        }
      },
      userOneId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
        primaryKey: true,
      },
      userTwoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Relationships');
  }
};