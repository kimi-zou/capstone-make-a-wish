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
      },
      {
        userOneId: 1,
        userTwoId: 6,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 7,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 8,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 9,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 10,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 11,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 12,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 13,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 14,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 15,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 16,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 17,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 18,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 19,
        status: 1,
        actionUserId: 1
      },
      {
        userOneId: 1,
        userTwoId: 20,
        status: 1,
        actionUserId: 1
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
