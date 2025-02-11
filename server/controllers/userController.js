const { comparePass } = require("../helpers/bcryptjs");
const { signInToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");
const cloudinary = require("../config/cloudinary");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      console.log("[INFO] Login API called");

      const { email, password } = req.body;
      if (!email?.trim() || !password?.trim()) {
        return res
          .status(400)
          .json({ message: "Email and Password are required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePass(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
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

      const updates = {};
      if (username?.trim()) {
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
          return res
            .status(400)
            .json({ message: "Invalid file format. Use JPG, PNG, or WebP." });
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (size > maxSize) {
          return res
            .status(400)
            .json({ message: "File size exceeds 5MB limit." });
        }

        console.log("[INFO] Uploading to Cloudinary...");
        const dataURI = `data:${mimetype};base64,${buffer.toString("base64")}`;

        let uploadResult;
        try {
          uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: "delizioso-profile",
            public_id: `profile_${id}_${Date.now()}`,
          });
        } catch (cloudinaryError) {
          console.error("[ERROR] Cloudinary upload failed:", cloudinaryError);
          return res
            .status(500)
            .json({ message: "Image upload failed. Please try again." });
        }

        console.log(`[SUCCESS] Image uploaded: ${uploadResult.secure_url}`);
        updates.imageUrl = uploadResult.secure_url;
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No changes provided" });
      }

      console.log("[INFO] Updating user profile...");
      const [updated] = await User.update(updates, { where: { id } });
      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(`[SUCCESS] User ID ${id} profile updated`);

      res.status(200).json({
        message: "Profile updated successfully",
        user: { id, ...updates },
      });
    } catch (error) {
      console.error("[ERROR] Failed to update profile:", error);
      next(error);
    }
  }
};
