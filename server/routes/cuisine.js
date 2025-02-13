const express = require("express");
const {
  getAllCuisine,
  getDetailCuisine,
  addCuisine,
  removeCuisine,
} = require("../controllers/cuisineController");

const router = express.Router();

router.get("/", getAllCuisine);
router.get("/:id/detail", getDetailCuisine);

router.post("/", addCuisine);
router.delete("/:id", removeCuisine);

module.exports = router;
