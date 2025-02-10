const { comparePass } = require("../helpers/bcryptjsHelper");
const { signInToken } = require("../helpers/jwtHelper");
const { User } = require("../models");
const cloudinary = require("../config/cloudinary");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      console.log("[INFO] Login API called");

      const { email, password } = req.body;
      if (!email?.trim() || !password?.trim()) {
        throw {
          name: "BadRequest",
          message: "Email and Password are required",
        };
      }

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePass(password, user.password)) {
        throw { name: "Unauthorized" };
      }

      const access_token = signInToken({ id: user.id, role: user.role });

      console.log(`[SUCCESS] User ${user.email} logged in`);
      res.status(200).json({ access_token });
    } catch (error) {
      console.error("[ERROR] Login failed:", error);
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      console.log("[INFO] Register API called");

      const { username, email, password } = req.body;
      const newUser = await User.create({ username, email, password });

      console.log(`[SUCCESS] User ${newUser.email} registered`);
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      console.error("[ERROR] Registration failed:", error);
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      console.log("[INFO] Fetching logged-in user");
      res.status(200).json(req.user);
    } catch (error) {
      console.error("[ERROR] Failed to fetch user:", error);
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      console.log("[INFO] Fetching all users");

      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      console.log(`[SUCCESS] Retrieved ${users.length} users`);
      res.status(200).json(users);
    } catch (error) {
      console.error("[ERROR] Failed to fetch users:", error);
      next(error);
    }
  }

  static async updateProfileUser(req, res, next) {
    try {
      console.log("[INFO] Update Profile API called");

      const { id } = req.user;
      const { username } = req.body;

      let updates = {};
      if (username?.trim()) {
        console.log(`[INFO] Updating username: ${username}`);
        updates.username = username;
      }

      if (req.file) {
        console.log("[INFO] Processing profile image upload");

        const { originalname, mimetype, size, buffer } = req.file;
        console.log(`📂 File: ${originalname} (${mimetype}, ${size} bytes)`);

        const allowedFormats = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedFormats.includes(mimetype)) {
          throw {
            name: "BadRequest",
            message: "Invalid file format. Use JPG, PNG, or WebP.",
          };
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (size > maxSize) {
          throw { name: "BadRequest", message: "File size exceeds 5MB limit." };
        }

        console.log("[INFO] Uploading to Cloudinary...");
        const dataURI = `data:${mimetype};base64,${buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "delizioso-profile",
          public_id: `profile_${id}_${Date.now()}`,
        });

        console.log(`[SUCCESS] Image uploaded: ${uploadResult.secure_url}`);
        updates.imageUrl = uploadResult.secure_url;
      }

      if (Object.keys(updates).length === 0) {
        console.log("[INFO] No updates made");
        return res.status(400).json({ message: "No changes provided" });
      }

      console.log("[INFO] Updating user profile...");
      const updatedUser = await User.findByPk(id);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await updatedUser.update(updates);
      console.log(`[SUCCESS] User ID ${id} profile updated`);

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          imageUrl: updatedUser.imageUrl,
        },
      });
    } catch (error) {
      console.error("[ERROR] Failed to update profile:", error);
      next(error);
    }
  }
};
