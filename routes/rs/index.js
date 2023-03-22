const router = require("express").Router();

router.use("/suppliers", require("./suppliers"));
router.use("/product-categories", require("./productCategories"));
router.use("/products", require("./products"));
router.use("/delivery-types", require("./deliveryTypes"));
router.use("/deliveries", require("./deliveries"));
router.use("/invoices", require("./invoices"));
router.use("/purchases", require("./purchases"));
router.use("/adjustments", require("./adjustments"));
router.use("/purchase-adjustments", require("./purchaseAdjustments"));
router.use("/reports", require("./reports"));
router.use("/seed", require("./seed"));

module.exports = router;
