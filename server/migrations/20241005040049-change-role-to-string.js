"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "Users",
        "role",
        {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "staff",
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Users_role";',
        { raw: true, transaction }
      );

      await queryInterface.changeColumn(
        "Users",
        "role",
        {
          type: Sequelize.ENUM("admin", "staff"),
          allowNull: false,
          defaultValue: "staff",
        },
        { transaction }
      );
    });
  },
};
