"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Italian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Japanese",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mexican",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Indian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "French",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
