"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cuisine, { foreignKey: "UserId" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
          len: {
            args: [3, 50],
            msg: "Username must be between 3 and 50 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Must be a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          len: {
            args: [8, 100],
            msg: "Password must be at least 8 characters long",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "staff",
        validate: {
          isIn: {
            args: [["admin", "staff"]],
            msg: "Role must be either 'admin' or 'staff'",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING(2083),
        validate: {
          isUrl: { msg: "Image must be a valid URL" },
        },
      },
    },
    {
      hooks: {
        beforeValidate(user) {
          if (user.email) {
            user.email = user.email.trim().toLowerCase();
          }
          if (user.username) {
            user.username = user.username.trim();
          }
        },
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
        beforeUpdate(user) {
          if (user.changed("password")) {
            user.password = hashPassword(user.password);
          }
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  return User;
};
