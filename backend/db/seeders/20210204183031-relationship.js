'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Relationships', [
      {
        userOneId: 1,
        userTwoId: 2,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 3,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 4,
        status: 0,
        actionUserId: 4
      },
      {
        userOneId: 1,
        userTwoId: 5,
        status: 0,
        actionUserId: 5
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Relationships', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
