const router = require("express").Router();

router.use("/items", require("./items"));
router.use("/deliveries", require("./deliveries"));
router.use("/loans", require("./loans"));

module.exports = router;
