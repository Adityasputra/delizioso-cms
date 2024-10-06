const router = require("express").Router();
const upload = require("../middlewares/multer");
const { getUser, updateProfileUser } = require("../controllers/userController");

router.get("/", getUser);
router.put("/", upload.single("imageUrl"), updateProfileUser);

module.exports = router;
