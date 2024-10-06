const router = require("express").Router();
const upload = require("../middlewares/multer");
const {
  addCuisine,
  getAllCuisine,
} = require("../controllers/cuisineController");

router.post("/", upload.single("imgUrl"), addCuisine);
router.get("/", getAllCuisine);
router.get("/:id/detail", () => {});
router.put("/:id/edit", () => {});
router.delete("/:id/remove", () => {});

module.exports = router;
