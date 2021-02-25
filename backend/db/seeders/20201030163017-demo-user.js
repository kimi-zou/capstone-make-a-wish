const faker = require('faker');
const bcrypt = require('bcryptjs');

const { getRandomImages, avatars } = require('../../utils/random-seed-image');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo',
        displayName: 'Demo',
        hashedPassword: bcrypt.hashSync('password'),
        birthday: new Date('1992-9-24'),
        avatar: getRandomImages(avatars)
      },
      {
        email: 'friend1@user.io',
        username: 'friend1',
        displayName: 'Demo Friend 1',
        hashedPassword: bcrypt.hashSync('password'),
        birthday: new Date('1990-2-26'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: 'friend2',
        displayName: 'Demo Friend 2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: new Date('1990-2-28'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: 'friend3',
        displayName: 'Demo Friend 3',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: new Date('1990-2-18'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: new Date('1990-3-6'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: faker.date.between('1950-01-01', '2020-12-31'),
        avatar: getRandomImages(avatars)
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      // username: { [Op.in]: ['demo', 'friend1', 'friend2'] }
    }, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
