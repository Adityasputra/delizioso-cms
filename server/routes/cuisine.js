const router = require("express").Router();
const upload = require("../middlewares/multer");
const {
  addCuisine,
  getAllCuisine,
  getDetailCuisine,
  editCuisine,
} = require("../controllers/cuisineController");

router.post("/", upload.single("imgUrl"), addCuisine);
router.get("/", getAllCuisine);
router.get("/:id/detail", getDetailCuisine);
router.put("/:id/edit", upload.single("imgUrl"), editCuisine);
router.delete("/:id/remove", () => {});

module.exports = router;
