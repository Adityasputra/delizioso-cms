const { Category } = require("../models");

module.exports = class CategoryController {
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
};
