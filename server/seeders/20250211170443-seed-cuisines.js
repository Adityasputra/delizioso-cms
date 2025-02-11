"use strict";

import { faker } from "@faker-js/faker";

export default {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM "Categories";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (categories.length === 0 || users.length === 0) {
      throw new Error("Categories or Users table is empty. Seed them first.");
    }

    const cuisines = [];

    for (let i = 1; i <= 20; i++) {
      cuisines.push({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.number.int({ min: 10000, max: 100000 }),
        imgUrl: faker.image.urlLoremFlickr({ category: "food" }),
        CategoryId: faker.helpers.arrayElement(categories).id, // Ambil ID dari kategori yang tersedia
        UserId: faker.helpers.arrayElement(users).id, // Ambil ID dari user yang tersedia
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Cuisines", cuisines, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cuisines", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Cuisines_id_seq" RESTART WITH 1;'
    );
  },
};
