"use strict";
const { hashPassword } = require("../helpers/bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: "admin1",
        email: "admin1@example.com",
        password: "password123",
        role: "admin",
      },
      {
        username: "staff1",
        email: "staff1@example.com",
        password: "password123",
        role: "staff",
      },
      {
        username: "staff2",
        email: "staff2@example.com",
        password: "password123",
        role: "staff",
      },
      {
        username: "staff3",
        email: "staff3@example.com",
        password: "password123",
        role: "staff",
      },
      {
        username: "staff4",
        email: "staff4@example.com",
        password: "password123",
        role: "staff",
      },
    ];

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    await queryInterface.bulkInsert("Users", hashedUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;'
    );
  },
};
