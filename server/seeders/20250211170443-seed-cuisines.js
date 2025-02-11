"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cuisines = [];

    for (let i = 1; i <= 20; i++) {
      cuisines.push({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.number.int({ min: 10000, max: 100000 }),
        imgUrl: faker.image.urlLoremFlickr({ category: "food" }),
        CategoryId: faker.number.int({ min: 1, max: 5 }),
        UserId: faker.number.int({ min: 1, max: 3 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Cuisines", cuisines, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cuisines", null, {});
  },
};
