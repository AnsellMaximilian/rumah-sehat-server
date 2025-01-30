const router = require("express").Router();
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const serverTimestamp = moment().format("DD-MM-YYYY HH:mm:ss");

    res.json({
      data: {
        dbName: process.env.DB_NAME,
        serverTimestamp,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
