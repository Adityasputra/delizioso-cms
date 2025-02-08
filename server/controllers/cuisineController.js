const { Cuisine, Category, User } = require("../models");
const cloudinary = require("../config/cloudinary");
const { Op } = require("sequelize");

module.exports = class CuisineController {
  static async addCuisine(req, res, next) {
    try {
      console.log("📌 [START] Add Cuisine API called");

      const { name, description, price, CategoryId } = req.body;
      console.log("📝 Request body:", { name, description, price, CategoryId });

      if (!name || !description || !price || !CategoryId) {
        throw { name: "BadRequest", message: "All fields are required" };
      }

      let option = {
        name,
        description,
        price,
        CategoryId,
        UserId: req.user.id,
      };
      console.log("✅ Form data valid. Processing...");

      if (req.file) {
        console.log("📂 File received:", req.file.originalname);
        console.log("📏 File size:", req.file.size);
        console.log("📦 Buffer length:", req.file.buffer.length);
        console.log("🖼️ MIME type:", req.file.mimetype);

        const allowedFormats = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedFormats.includes(req.file.mimetype)) {
          throw {
            name: "BadRequest",
            message: "Invalid file format. Use JPG, PNG, or WebP.",
          };
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (req.file.size > maxSize) {
          throw {
            name: "BadRequest",
            message: "File size exceeds 10MB limit.",
          };
        }

        try {
          console.log("🚀 Uploading to Cloudinary...");
          const b64File = Buffer.from(req.file.buffer).toString("base64");
          const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

          const timestamp = Date.now();
          const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: "delizioso-profile",
            public_id: `${req.file.originalname.split(".")[0]}_${timestamp}`,
          });

          console.log("✅ Upload successful:", uploadResult.secure_url);
          option.imgUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("❌ Error uploading to Cloudinary:", uploadError);
          throw { name: "BadRequest", message: "Failed to upload image" };
        }
      } else {
        console.log("⚠️ No file uploaded. Skipping image upload.");
      }

      console.log("💾 Saving to database...");
      const newCuisine = await Cuisine.create(option);
      console.log("✅ New cuisine added:", newCuisine);

      res.status(201).json(newCuisine);
    } catch (error) {
      console.error("❌ Error in addCuisine:", error);
      next(error);
    }
  }

  static async getAllCuisine(req, res, next) {
    try {
      const { search, page } = req.query;
      const paramsQuery = {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          Category,
        ],
        order: [["createdAt", "DESC"]],
      };

      if (search) {
        paramsQuery.where = {
          name: { [Op.iLike]: `%${search}%` },
        };
      }

      let limit = 6;
      let pageNumber = 1;

      if (page) {
        if (page.size) {
          limit = +page.size;
          paramsQuery.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          paramsQuery.offset = limit * (pageNumber - 1);
        }
      }

      const { count, rows } = await Cuisine.findAndCountAll(paramsQuery);
      return res.json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCuisine(req, res, next) {
    try {
      const { id } = req.params;
      console.log(`🔍 Fetching cuisine ID: ${id}`);
      const findCuisine = await Cuisine.findByPk(id);

      if (!findCuisine) {
        throw { name: "NotFound", message: "Cuisine not found" };
      }

      res.status(200).json(findCuisine);
    } catch (error) {
      console.error("❌ Error in getDetailCuisine:", error);
      next(error);
    }
  }

  static async editCuisine(req, res, next) {
    try {
      const { name, description, price, CategoryId } = req.body;
      const { id } = req.params;
      let option = {};

      if (name || description || price || CategoryId) {
        option = {
          ...option,
          name,
          description,
          price,
          CategoryId,
          UserId: req.user.id,
        };
      }

      if (req.file) {
        try {
          console.log("🚀 Uploading updated image...");
          const b64File = Buffer.from(req.file.buffer).toString("base64");
          const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

          const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: "delizioso-profile",
            public_id: `${req.file.originalname.split(".")[0]}_${Date.now()}`,
          });

          option.imgUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("❌ Failed to upload new image:", uploadError);
          throw { name: "BadRequest", message: "Failed to upload image" };
        }
      }

      await Cuisine.update(option, { where: { id } });
      console.log("✅ Cuisine updated:", option);

      res.status(200).json({ message: "Cuisine successfully updated" });
    } catch (error) {
      console.error("❌ Error in editCuisine:", error);
      next(error);
    }
  }

  static async removeCuisine(req, res, next) {
    try {
      const { id } = req.params;
      await Cuisine.destroy({ where: { id } });
      console.log(`🗑️ Cuisine ID ${id} deleted.`);

      res.status(200).json({ message: "Cuisine successfully deleted" });
    } catch (error) {
      console.error("❌ Error in removeCuisine:", error);
      next(error);
    }
  }
};
