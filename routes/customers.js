const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({ message: "fag" });
});

module.exports = router;
