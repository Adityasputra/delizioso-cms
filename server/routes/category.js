const { addCategory } = require("../controllers/categoryController");
const { checkRoleUser } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", () => {});
router.post("/", checkRoleUser, addCategory);
router.delete("/:id/remove", () => {});

module.exports = router;
