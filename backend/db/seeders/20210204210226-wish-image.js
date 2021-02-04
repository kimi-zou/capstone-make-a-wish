'use strict';
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WishImages', [
      {
        wishId: 1,
        image: "https://globalnews.ca/wp-content/uploads/2019/01/samssung-wall-tv.jpg?quality=85&strip=all",
      }, 
      {
        wishId: 2,
        image: "https://www.nintendo.com/content/dam/noa/en_US/games/switch/m/minecraft-switch/minecraft-switch-hero.jpg",
      }, 
      {
        wishId: 2,
        image: "https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-smash-bros-ultimate-switch/super-smash-bros-ultimate-switch-hero.jpg",
      }, 
      {
        wishId: 2,
        image: "https://www.nintendo.com/content/dam/noa/en_US/games/switch/m/mario-kart-8-deluxe-switch/mario-kart-8-deluxe-switch-hero.jpg",
      }, 
      {
        wishId: 3,
        image: faker.image.imageUrl()
      }, 
      {
        wishId: 3,
        image: faker.image.imageUrl()
      },
      {
        wishId: 3,
        image: faker.image.imageUrl()
      },
      {
        wishId: 4,
        image: faker.image.imageUrl()
      },
      {
        wishId: 5,
        image: faker.image.imageUrl()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WishImages', null, {});
  }
};
