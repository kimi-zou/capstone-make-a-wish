'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('NotificationReceivers', [
      {
        receiverId: 1,
        actorId: 4,
        notificationObjectId: 1,
        status: 0
      },
      {
        receiverId: 1,
        actorId: 5,
        notificationObjectId: 2,
        status: 0
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NotificationReceivers', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
