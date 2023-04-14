const express = require("express");
const router = express.Router();
const {
  translate,
  getTranslationData,
  postAll,
} = require("../controllers/translateToItController");

router.post("/", translate);
router.get("/:id", getTranslationData);
router.post("/postall", postAll);

module.exports = router;
