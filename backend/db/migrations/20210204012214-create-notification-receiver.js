'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => { 
    return queryInterface.createTable('NotificationReceivers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        }
      },
      notificationObjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "NotificationObjects",
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NotificationReceivers');
  }
};