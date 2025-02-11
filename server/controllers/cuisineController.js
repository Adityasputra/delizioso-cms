const { Cuisine, Category, User } = require("../models");
const cloudinary = require("../config/cloudinary");
const redis = require("../config/redis");
const { Op } = require("sequelize");

async function uploadImage(file) {
  if (!file) return null;

  const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedFormats.includes(file.mimetype)) {
    throw {
      name: "BadRequest",
      message: "Invalid file format. Use JPG, PNG, or WebP.",
    };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw { name: "BadRequest", message: "File size exceeds 10MB limit." };
  }

  console.log("🚀 Uploading image to Cloudinary...");
  const dataURI = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;

  let uploadResult;
  try {
    uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "delizioso-profile",
      public_id: `${file.originalname.split(".")[0]}_${Date.now()}`,
    });
  } catch (error) {
    console.error("[ERROR] Cloudinary upload failed:", error);
    throw {
      name: "UploadError",
      message: "Image upload failed, please try again.",
    };
  }

  return uploadResult.secure_url;
}

module.exports = class CuisineController {
  static async addCuisine(req, res, next) {
    try {
      console.log("[INFO] Adding new cuisine");

      const { name, description, price, CategoryId } = req.body;
      if (!name || !description || !price || !CategoryId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const imgUrl = req.file ? await uploadImage(req.file) : null;
      const newCuisine = await Cuisine.create({
        name,
        description,
        price,
        CategoryId,
        UserId: req.user.id,
        imgUrl,
      });

      console.log(`[SUCCESS] Cuisine '${newCuisine.name}' added`);

      await redis.del("cuisine-list:");

      res.status(201).json(newCuisine);
    } catch (error) {
      console.error("[ERROR] Failed to add cuisine:", error);
      next(error);
    }
  }

  static async getAllCuisine(req, res, next) {
    try {
      console.log("[INFO] Fetching all cuisines");

      let { search, page } = req.query;

      const pageNumber = Math.max(Number(page?.number) || 1, 1);
      const pageSize = Math.max(Number(page?.size) || 6, 6);

      const offset = (pageNumber - 1) * pageSize;
      const cacheKey = `cuisine-list:${
        search || "all"
      }:page${pageNumber}:size${pageSize}`;

      // Cek cache di Redis
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log(`🚀 Cache hit: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

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
      };

      if (search) {
        options.where = { name: { [Op.iLike]: `%${search}%` } };
      }

      const cuisines = await Cuisine.findAndCountAll(options);

      console.log(`[SUCCESS] Retrieved ${cuisines.rows.length} cuisines`);

      const response = {
        totalItems: cuisines.count,
        totalPages: Math.ceil(cuisines.count / pageSize),
        currentPage: pageNumber,
        pageSize: pageSize,
        data: cuisines.rows,
      };

      await redis.setex(cacheKey, 300, JSON.stringify(response));

      res.status(200).json(response);
    } catch (error) {
      console.error("[ERROR] Failed to fetch cuisines:", error);
      next(error);
    }
  }

  static async getDetailCuisine(req, res, next) {
    try {
      console.log("[INFO] Fetching cuisine details");

      const cacheKey = `cuisine-detail:${req.params.id}`;

      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log(`🚀 Cache hit: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      const findCuisine = await Cuisine.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["id", "username", "email", "imageUrl"] },
          { model: Category, attributes: ["id", "name"] },
        ],
      });

      if (!findCuisine) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      console.log(`[SUCCESS] Found cuisine '${findCuisine.name}'`);

      await redis.setex(cacheKey, 300, JSON.stringify(findCuisine));

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

      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) {
        return res.status(404).json({ message: "Cuisine not found" });
      }

      const imgUrl = req.file ? await uploadImage(req.file) : cuisine.imgUrl;
      const updatedData = {
        name,
        description,
        price,
        CategoryId,
        UserId: req.user.id,
        imgUrl,
      };

      if (!name && !description && !price && !CategoryId && !req.file) {
        return res.status(400).json({ message: "No changes provided" });
      }

      await cuisine.update(updatedData);

      console.log(`[SUCCESS] Cuisine '${cuisine.name}' updated`);

      await redis.del("cuisine-list:");
      await redis.del(`cuisine-detail:${id}`);

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

      await redis.del("cuisine-list:");
      await redis.del(`cuisine-detail:${id}`);

      res.status(200).json({ message: "Cuisine successfully deleted" });
    } catch (error) {
      console.error("[ERROR] Failed to delete cuisine:", error);
      next(error);
    }
  }
};
