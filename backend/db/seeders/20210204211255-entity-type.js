'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EntityTypes', [
      {
        entity: 'Friend',
        description: 'Receive a friend request.'
      },
      {
        entity: 'Friend',
        description: 'Friend request is accpeted.'
      },
      {
        entity: 'Birthday',
        description: 'Friend\'s birthday is coming up.'
      },
      {
        entity: 'Wish',
        description: 'Wish is locked.'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EntityTypes', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
