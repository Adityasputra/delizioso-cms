"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.User, { foreignKey: "UserId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }

  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Cuisine name is required" },
          notNull: { msg: "Cuisine name is required" },
          len: {
            args: [1, 100],
            msg: "Cuisine name must be between 1 and 100 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
          notNull: { msg: "Description is required" },
          len: {
            args: [10, 500],
            msg: "Description must be between 10 and 500 characters",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price is required" },
          notNull: { msg: "Price is required" },
          isDecimal: { msg: "Price must be a valid number" },
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING(2083),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image is required" },
          notNull: { msg: "Image is required" },
          isUrl: { msg: "Image must be a valid URL" },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
          notNull: { msg: "Category is required" },
          isInt: { msg: "Category ID must be an integer" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
          notNull: { msg: "User ID is required" },
          isInt: { msg: "User ID must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
      timestamps: true,
      hooks: {
        beforeValidate: (cuisine) => {
          if (cuisine.name) {
            cuisine.name = cuisine.name.trim().toLowerCase();
          }
          if (cuisine.description) {
            cuisine.description = cuisine.description.trim();
          }
        },
      },
    }
  );

  return Cuisine;
};
