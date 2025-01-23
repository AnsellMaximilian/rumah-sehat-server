const router = require("express").Router();

router.use("/suppliers", require("./suppliers"));
router.use("/draws", require("./draws"));
router.use("/product-categories", require("./productCategories"));
router.use("/products", require("./products"));
router.use("/delivery-types", require("./deliveryTypes"));
router.use("/deliveries", require("./deliveries"));
router.use("/invoices", require("./invoices"));
router.use("/purchases", require("./purchases"));
router.use("/adjustments", require("./adjustments"));
router.use("/delivery-expenses", require("./deliveryExpenses"));
router.use("/purchase-adjustments", require("./purchaseAdjustments"));
router.use("/purchase-invoices", require("./purchaseInvoices"));
router.use("/reports", require("./reports"));
router.use("/exports", require("./exports"));
router.use("/analytics", require("./analytics"));
router.use("/seed", require("./seed"));
router.use("/playground", require("./playground"));
router.use("/stock-adjustments", require("./stockAdjustments"));

module.exports = router;
