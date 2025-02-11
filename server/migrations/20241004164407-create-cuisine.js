"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cuisines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(500), 
        validate: {
          notEmpty: true,
          len: [10, 500],
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING(2083),
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

    await queryInterface.addIndex("Cuisines", ["CategoryId"]);
    await queryInterface.addIndex("Cuisines", ["UserId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cuisines");
  },
};
