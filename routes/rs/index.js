const router = require("express").Router();

router.use("/suppliers", require("./suppliers"));

module.exports = router;
