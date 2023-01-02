const router = require("express").Router();

router.use("/id", require("./id"));
router.use("/discount-models", require("./discountModels"));

module.exports = router;
