const express = require("express");
const cacheMiddleware = require("../middlewares/redis");
const {
  getAllCuisine,
  getDetailCuisine,
  addCuisine,
  removeCuisine,
} = require("../controllers/cuisineController");

const router = express.Router();

router.get("/", cacheMiddleware("cuisine-list", 300), getAllCuisine);
router.get("/:id", cacheMiddleware("cuisine-detail", 300), getDetailCuisine);

router.post("/", addCuisine);
router.delete("/:id", removeCuisine);

module.exports = router;
