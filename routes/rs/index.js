const router = require("express").Router();

router.use("/suppliers", require("./suppliers"));
router.use("/product-categories", require("./productCategories"));
router.use("/products", require("./products"));

module.exports = router;
