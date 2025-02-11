const express = require("express");
const router = express.Router();

const routerPublic = require("./public");
const routerUser = require("./user");
const routerCuisine = require("./cuisine");
const routerCategory = require("./category");
const routerProfile = require("./profile");

const { authentication } = require("../middlewares/auth");
const errorHandle = require("../middlewares/errorHandle");

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
