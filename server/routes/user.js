const { login } = require("../controllers/userController");

const router = require("express").Route();

router.post("/login", login);
router.post("/", () => {});

module.exports = router;
