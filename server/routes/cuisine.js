const router = require("express").Route();

router.get("/", () => {});
router.post("/", () => {});
router.get("/:id/detail", () => {});
router.put("/:id/edit", () => {});
router.delete("/:id/remove");

module.exports = router;
