const { Cuisine, Category, User } = require("../models");
const cloudinary = require("../config/cloudinary");
const { Op } = require("sequelize");

async function uploadImage(file) {
  if (!file) return null;

  const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedFormats.includes(file.mimetype)) {
    throw {
      name: "BadRequest",
      message: "Invalid file format. Use JPG, PNG, GIF, or WebP.",
    };
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw { name: "BadRequest", message: "File size exceeds 10MB limit." };
  }

  console.log("🚀 Uploading image to Cloudinary...");
  const dataURI = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;

  try {
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "delizioso-profile",
      public_id: `${file.originalname.split(".")[0]}_${Date.now()}`,
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("[ERROR] Cloudinary upload failed:", error);
    throw {
      name: "UploadError",
      message: "Image upload failed, please try again.",
    };
  }
}

module.exports = class CuisineController {
  static async addCuisine(req, res, next) {
    try {
      console.log("[INFO] Adding new cuisine");

      const { name, description, price, CategoryId } = req.body;
      if (!name || !description || !price || !CategoryId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        return res
          .status(400)
          .json({ message: "Price must be a valid positive number" });
      }

      const imgUrl = req.file ? await uploadImage(req.file) : null;
      const newCuisine = await Cuisine.create({
        name,
        description,
        price: parsedPrice,
        CategoryId,
        UserId: req.user.id,
        imgUrl,
      });

      console.log(`[SUCCESS] Cuisine '${newCuisine.name}' added`);
      res.status(201).json(newCuisine);
    } catch (error) {
      console.error("[ERROR] Failed to add cuisine:", error);
      next(error);
    }
  }

  static async getAllCuisine(req, res, next) {
    try {
      console.log("[INFO] Fetching all cuisines");

      let { search = "", page = "1", size = "6" } = req.query;

      const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
      const pageSize = Math.max(parseInt(size, 10) || 6, 1);
      const offset = (pageNumber - 1) * pageSize;

      const options = {
        limit: pageSize,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "username", "email", "role", "imageUrl"],
          },
          { model: Category, attributes: ["id", "name"] },
        ],
        where: search ? { name: { [Op.iLike]: `%${search}%` } } : undefined,
      };

      const cuisines = await Cuisine.findAndCountAll(options);

      console.log(`[SUCCESS] Retrieved ${cuisines.rows.length} cuisines`);

      res.status(200).json({
        totalItems: cuisines.count,
        totalPages: Math.ceil(cuisines.count / pageSize),
        currentPage: pageNumber,
        pageSize: pageSize,
        data: cuisines.rows,
      });
    } catch (error) {
      console.error("[ERROR] Failed to fetch cuisines:", error);
      next(error);
    }
  }

  static async getDetailCuisine(req, res, next) {
    try {
      console.log("[INFO] Fetching cuisine details");

      const { id } = req.params;
      const findCuisine = await Cuisine.findByPk(id, {
        include: [
          { model: User, attributes: ["id", "username", "email", "imageUrl"] },
          { model: Category, attributes: ["id", "name"] },
        ],
      });

      if (!findCuisine) {
        console.log(`[WARN] Cuisine ID ${id} not found`);
        return res.status(404).json({ message: "Cuisine not found" });
      }

      console.log(`[SUCCESS] Found cuisine '${findCuisine.name}'`);
      res.status(200).json(findCuisine);
    } catch (error) {
      console.error("[ERROR] Failed to fetch cuisine details:", error);
      next(error);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      console.log("[INFO] Editing cuisine");

      const { id } = req.params;
      const { name, description, price, CategoryId } = req.body;

      if (price && (isNaN(price) || price <= 0)) {
        return res
          .status(400)
          .json({ message: "Price must be a valid positive number" });
      }

      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      const imgUrl = req.file ? await uploadImage(req.file) : cuisine.imgUrl;

      await cuisine.update({
        name,
        description,
        price,
        CategoryId,
        UserId: req.user.id,
        imgUrl,
      });

      console.log(`[SUCCESS] Cuisine '${cuisine.name}' updated`);
      res
        .status(200)
        .json({ message: "Cuisine successfully updated", cuisine });
    } catch (error) {
      console.error("[ERROR] Failed to edit cuisine:", error);
      next(error);
    }
  }

  static async removeCuisine(req, res, next) {
    try {
      console.log("[INFO] Deleting cuisine");

      const { id } = req.params;
      const deleted = await Cuisine.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      console.log(`[SUCCESS] Cuisine ID ${id} deleted`);
      res.status(200).json({ message: "Cuisine successfully deleted" });
    } catch (error) {
      console.error("[ERROR] Failed to delete cuisine:", error);
      next(error);
    }
  }
};
