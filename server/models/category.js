"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Cuisine, { foreignKey: "CategoryId" });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Category is required" },
          notEmpty: { msg: "Category is required" },
          len: {
            args: [1, 100],
            msg: "Category must be between 1 and 100 characters",
          },
          is: {
            args: [/^\S(.*\S)?$/], // allow only non-space characters
            msg: "Category cannot be only spaces",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
      hooks: {
        beforeValidate: (category) => {
          if (category.name) {
            category.name = category.name.trim().toLowerCase();
          }
        },
      },
    }
  );

  return Category;
};
