const router = require("express").Router();

router.use("/id", require("./id"));
router.use("/sg", require("./sg"));
router.use("/my", require("./my"));
router.use("/discount-models", require("./discountModels"));
router.use("/invoices", require("./invoices"));

module.exports = router;
