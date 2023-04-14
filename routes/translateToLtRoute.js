const express = require("express");
const router = express.Router();
const {
  translate,
  post,
  getTranslationData,
  postAll,
} = require("../controllers/translateToLtController");

router.get("/:id", getTranslationData);
router.post("/", translate);
router.post("/post", post);
router.post("/postall", postAll);

module.exports = router;
