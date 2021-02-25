'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('NotificationObjects', [
      {
        entityId: 3,
        entityTypeId: 1
      },
      {
        entityId: 4,
        entityTypeId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NotificationObjects', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
