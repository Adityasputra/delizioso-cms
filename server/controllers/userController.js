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
      console.log("📌 [START] Update Profile API called");

      const { id } = req.user;
      const { username } = req.body;
      console.log("📝 Request body:", { username });

      const option = {};

      if (username) {
        console.log("✅ Username updated:", username);
        option.username = username;
      }

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

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
          throw { name: "BadRequest", message: "File size exceeds 5MB limit." };
        }

        try {
          console.log("🚀 Uploading to Cloudinary...");
          const b64File = Buffer.from(req.file.buffer).toString("base64");
          const dataURI = `data:${req.file.mimetype};base64,${b64File}`;

          const timestamp = Date.now();
          const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: "delizioso-profile",
            public_id: `profile_${id}_${timestamp}`,
          });

          console.log("✅ Upload successful:", uploadResult.secure_url);
          option.imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("❌ Error uploading to Cloudinary:", uploadError);
          throw { name: "BadRequest", message: "Failed to upload image" };
        }
      } else {
        console.log("⚠️ No file uploaded. Skipping image update.");
      }

      console.log("💾 Updating user profile...");
      const [updatedRows] = await User.update(option, { where: { id } });

      if (updatedRows === 0) {
        console.log("⚠️ No changes made or user not found.");
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }

      console.log(`✅ User ID ${id} profile updated successfully`, option);
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("❌ Error in updateProfileUser:", error);
      next(error);
    }
  }
};
