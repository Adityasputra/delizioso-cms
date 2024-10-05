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

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      await Category.destroy({ where: { id } });
      res.status(200).json({
        message: "Successfully to remove category",
      });
    } catch (error) {
      next(error);
    }
  }
};
