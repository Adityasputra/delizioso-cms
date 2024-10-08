const { Cuisine, Category, User } = require("../models");
const cloudinary = require("../config/cloudinary");

module.exports = class CuisineController {
  static async addCuisine(req, res, next) {
    try {
      const { name, description, price, CategoryId } = req.body;
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
        const b64File = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "delizioso-profile",
          public_id: req.file.originalname.split(".")[0],
        });

        option = { ...option, imgUrl: uploadResult.secure_url };
      }

      const newCuisine = await Cuisine.create(option);

      res.status(201).json(newCuisine);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllCuisine(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({ include: [User, Category] });
      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCuisine(req, res, next) {
    try {
      const { id } = req.params;
      const findCuisine = await Cuisine.findByPk(id);
      res.status(200).json(findCuisine);
    } catch (error) {
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
        const b64File = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "delizioso-profile",
          public_id: req.file.originalname.split(".")[0],
        });

        option = { ...option, imgUrl: uploadResult.secure_url };
      }

      await Cuisine.update(option, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Cuisine successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeCuisine(req, res, next) {
    try {
      const { id } = req.params;
      await Cuisine.destroy({ where: { id } });
      res.status(200).json({
        message: "Cuisine successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  }
};
