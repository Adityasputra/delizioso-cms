const {
  addCategory,
  getCategories,
  removeCategory,
} = require("../controllers/categoryController");
const { checkRoleUser } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", getCategories);
router.post("/", checkRoleUser, addCategory);
router.delete("/:id/remove", checkRoleUser, removeCategory);

module.exports = router;
