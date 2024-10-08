const {
  login,
  addUser,
  getAllUsers,
} = require("../controllers/userController");
const { authentication, checkRoleUser } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/login", login);
router.post("/", authentication, checkRoleUser, addUser);
router.get("/", getAllUsers);

module.exports = router;
