"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "staff",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM({
        values: ["admin", "staff"],
      }),
      allowNull: false,
      defaultValue: "staff",
    });
  },
};
