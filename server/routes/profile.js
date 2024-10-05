const { getUser, updateProfileUser } = require("../controllers/userController");

const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getUser);
router.put("/", upload.single("imageUrl"), updateProfileUser);

module.exports = router;
