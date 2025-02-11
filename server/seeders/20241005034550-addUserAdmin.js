"use strict";

const { hashPassword } = require("../helpers/bcryptjsHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = hashPassword("testing123");

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "test",
          email: "test@gmail.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { email: "test@gmail.com" }, {});
  },
};
