'use strict';
const faker = require('faker');
const { gifts, getRandomImages } = require('../../utils/random-seed-image');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WishImages', [
      {
        wishId: 1,
        image: 'https://globalnews.ca/wp-content/uploads/2019/01/samssung-wall-tv.jpg?quality=85&strip=all'
      },
      {
        wishId: 2,
        image: 'https://www.nintendo.com/content/dam/noa/en_US/games/switch/m/minecraft-switch/minecraft-switch-hero.jpg'
      },
      {
        wishId: 2,
        image: 'https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-smash-bros-ultimate-switch/super-smash-bros-ultimate-switch-hero.jpg'
      },
      {
        wishId: 2,
        image: 'https://www.nintendo.com/content/dam/noa/en_US/games/switch/m/mario-kart-8-deluxe-switch/mario-kart-8-deluxe-switch-hero.jpg'
      },
      {
        wishId: 3,
        image: getRandomImages(gifts)
      },
      {
        wishId: 3,
        image: getRandomImages(gifts)
      },
      {
        wishId: 3,
        image: getRandomImages(gifts)
      },
      {
        wishId: 3,
        image: getRandomImages(gifts)
      },
      {
        wishId: 4,
        image: getRandomImages(gifts)
      },
      {
        wishId: 4,
        image: getRandomImages(gifts)
      },
      {
        wishId: 4,
        image: getRandomImages(gifts)
      },
      {
        wishId: 5,
        image: getRandomImages(gifts)
      },
      {
        wishId: 5,
        image: getRandomImages(gifts)
      },
      {
        wishId: 5,
        image: getRandomImages(gifts)
      },
      {
        wishId: 5,
        image: getRandomImages(gifts)
      },
      {
        wishId: 6,
        image: getRandomImages(gifts)
      },
      {
        wishId: 6,
        image: getRandomImages(gifts)
      },
      {
        wishId: 6,
        image: getRandomImages(gifts)
      },
      {
        wishId: 7,
        image: getRandomImages(gifts)
      },
      {
        wishId: 7,
        image: getRandomImages(gifts)
      },
      {
        wishId: 8,
        image: getRandomImages(gifts)
      },
      {
        wishId: 9,
        image: getRandomImages(gifts)
      },
      {
        wishId: 10,
        image: getRandomImages(gifts)
      },
      {
        wishId: 10,
        image: getRandomImages(gifts)
      },
      {
        wishId: 10,
        image: getRandomImages(gifts)
      },
      {
        wishId: 11,
        image: getRandomImages(gifts)
      },
      {
        wishId: 12,
        image: getRandomImages(gifts)
      },
      {
        wishId: 12,
        image: getRandomImages(gifts)
      },
      {
        wishId: 13,
        image: getRandomImages(gifts)
      },
      {
        wishId: 13,
        image: getRandomImages(gifts)
      },
      {
        wishId: 13,
        image: getRandomImages(gifts)
      },
      {
        wishId: 13,
        image: getRandomImages(gifts)
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WishImages', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
