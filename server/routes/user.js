const { login, addUser } = require("../controllers/userController");
const { authentication, checkRoleUser } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/login", login);
router.post("/", authentication, checkRoleUser, addUser);

module.exports = router;
