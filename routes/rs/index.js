const router = require("express").Router();

router.use("/suppliers", require("./suppliers"));
router.use("/product-categories", require("./productCategories"));

module.exports = router;
