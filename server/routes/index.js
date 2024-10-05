const router = require("express").Router();

const routerPublic = require("./public");
const routerUser = require("./user");
const routerCuisine = require("./cuisine");
const routerCategory = require("./category");
const routerProfile = require("./profile");

const { authentication } = require("../middlewares/auth");
const errorHandle = require("../middlewares/errorHandle");

router.get("/", (req, res) => {
  res.send("Server is running...");
});

// Public Routes
router.use("/pub", routerPublic);

// Management Routes
router.use("/users", routerUser);
router.use(authentication);
router.use("/cuisines", routerCuisine);
router.use("/categories", routerCategory);
router.use("/profile", routerProfile);

router.use(errorHandle);

module.exports = router;
