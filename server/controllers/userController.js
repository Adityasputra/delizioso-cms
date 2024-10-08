const { comparePass } = require("../helpers/bcryptjsHelper");
const { signInToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

const cloudinary = require("../config/cloudinary");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw { name: "BadRequest", message: "Email / Password is required" };

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "Unauthorized" };

      const comparePassword = comparePass(password, findUser.password);
      if (!comparePassword) throw { name: "Unauthorized" };

      const access_token = signInToken({
        id: findUser.id,
        role: findUser.role,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileUser(req, res, next) {
    try {
      const { id } = req.user;
      const { username } = req.body;
      let option = {};

      if (username) {
        option = { ...option, username: username };
      }

      if (req.file) {
        const b64File = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "delizioso-profile",
        });

        option = { ...option, imageUrl: uploadResult.secure_url };
      }

      await User.update(option, {
        where: { id },
      });

      res.status(200).json({
        message: "Successfully to update Profile",
      });
    } catch (error) {
      next(error);
    }
  }
};
