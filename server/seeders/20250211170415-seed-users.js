"use strict";
const { hashPassword } = require("../helpers/bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin1",
          email: "admin1@example.com",
          password: hashPassword("password123"),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff1",
          email: "staff1@example.com",
          password: hashPassword("password123"),
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff2",
          email: "staff2@example.com",
          password: hashPassword("password123"),
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff3",
          email: "staff3@example.com",
          password: hashPassword("password123"),
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff4",
          email: "staff4@example.com",
          password: hashPassword("password123"),
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
