const { Category } = require("../models");

module.exports = class CategoryController {
  static async addCategory(req, res, next) {
    try {
      console.log("[INFO] Adding new category");

      const { name } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Category name is required" });
      }

      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const category = await Category.create({ name });

      console.log(`[SUCCESS] Category '${category.name}' added`);
      res.status(201).json(category);
    } catch (error) {
      console.error("[ERROR] Failed to add category:", error);
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      console.log("[INFO] Fetching all categories");

      const categories = await Category.findAll({
        order: [["createdAt", "DESC"]],
      });

      console.log(`[SUCCESS] Retrieved ${categories.length} categories`);
      res.status(200).json(categories);
    } catch (error) {
      console.error("[ERROR] Failed to fetch categories:", error);
      next(error);
    }
  }

  static async removeCategory(req, res, next) {
    try {
      console.log("[INFO] Deleting category");

      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.destroy();

      console.log(`[SUCCESS] Category '${category.name}' deleted`);
      res.status(200).json({ message: "Successfully removed category" });
    } catch (error) {
      console.error("[ERROR] Failed to delete category:", error);
      next(error);
    }
  }
};
