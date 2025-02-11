const express = require("express");
const router = express.Router();

const routerPublic = require("./public");
const routerUser = require("./user");
const routerCuisine = require("./cuisine");
const routerCategory = require("./category");
const routerProfile = require("./profile");

const { authentication } = require("../middlewares/auth");
const errorHandle = require("../middlewares/errorHandle");

const redis = require("../config/redis");

router.get("/test-redis", async (req, res) => {
  try {
    await redis.set("test-message", "Redis is working!");
    const message = await redis.get("test-message");
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

// Public routes (No authentication required)
router.use("/pub", routerPublic);

// Protected routes (Authentication required)
router.use("/users", routerUser);
router.use(authentication);
router.use("/cuisines", routerCuisine);
router.use("/categories", routerCategory);
router.use("/profile", routerProfile);

// Error handler
router.use(errorHandle);

module.exports = router;
