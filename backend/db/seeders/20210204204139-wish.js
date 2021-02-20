'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wishes', [
      {
        userId: 1,
        title: 'Large TV',
        description: 'A TV that can be hung on a wall.',
        link: 'https://www.amazon.com/Samsung-85-inch-Crystal-TU-8000-Built/dp/B084JCFNHF/ref=asc_df_B084JCFNHF/?tag=hyprod-20&linkCode=df0&hvadid=416803967659&hvpos=&hvnetw=g&hvrand=7868438985324833300&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9003534&hvtargid=pla-903277524235&psc=1&tag=&ref=&adgrpid=95587149964&hvpone=&hvptwo=&hvadid=416803967659&hvpos=&hvnetw=g&hvrand=7868438985324833300&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9003534&hvtargid=pla-903277524235',
        quantity: 1,
        status: 0
      },
      {
        userId: 1,
        title: 'Switch Games',
        description: '',
        link: 'https://www.nintendo.com/games/',
        quantity: 3,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 2,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 3,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 3,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 3,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 3,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      },
      {
        userId: 3,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        link: 'https://www.amazon.com/',
        quantity: 1,
        status: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wishes', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
