const { login } = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/", () => {});

module.exports = router;
