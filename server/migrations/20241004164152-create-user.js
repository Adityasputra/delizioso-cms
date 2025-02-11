"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
          notEmpty: true,
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(10),
        defaultValue: "staff",
        validate: {
          isIn: [["admin", "staff"]],
        },
      },
      imageUrl: {
        type: Sequelize.STRING(2083),
        validate: {
          isUrl: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
