const { comparePass } = require("../helpers/bcryptjsHelper");
const { signInToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

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
};
