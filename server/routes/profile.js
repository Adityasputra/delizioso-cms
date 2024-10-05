const { getUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getUser);
router.put("/", () => {});

module.exports = router;
