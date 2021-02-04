"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "demo@user.io",
        username: "demo",
        displayName: "Demo",
        hashedPassword: bcrypt.hashSync("password"),
        birthday: new Date("1992-9-24")
      },
      {
        email: "friend1@user.io",
        username: "friend1",
        displayName: "Demo Friend 1",
        hashedPassword: bcrypt.hashSync("password"),
        birthday: new Date("1993-11-23")
      },
      {
        email: faker.internet.email(),
        username: "friend2",
        displayName: "Demo Friend 2",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: new Date("2020-09-08")
      },
      {
        email: faker.internet.email(),
        username: "friend3",
        displayName: "Demo Friend 3",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        birthday: new Date("1975-05-03")
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users", {
      // username: { [Op.in]: ["demo", "friend1", "friend2"] }
    }, {});
  }
};
