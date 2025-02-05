const router = require("express").Router();

router.use("/items", require("./items"));
router.use("/deliveries", require("./deliveries"));
router.use("/loans", require("./loans"));
router.use("/stock-adjustments", require("./stockAdjustments"));
router.use("/bundles", require("./bundles"));

module.exports = router;
