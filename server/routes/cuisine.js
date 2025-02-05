const router = require("express").Router();
const upload = require("../middlewares/multer");
const {
  addCuisine,
  getAllCuisine,
  getDetailCuisine,
  editCuisine,
  removeCuisine,
} = require("../controllers/cuisineController");
const { authorization } = require("../middlewares/auth");

router.post("/", upload.single("imgUrl"), addCuisine);
router.get("/", getAllCuisine);
router.get("/:id/detail", getDetailCuisine);
router.put("/:id/edit", authorization, upload.single("imgUrl"), editCuisine);
router.delete("/:id/remove", authorization, removeCuisine);

module.exports = router;
