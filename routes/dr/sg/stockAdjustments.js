const router = require("express").Router();
const {
  sequelize: {
    models: { DrSgStockAdjustment },
  },
} = require("../../../models/index");

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const draw = await DrSgStockAdjustment.findByPk(id);
    await draw.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: draw });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { amount, date, description, ProductId } = req.body;

    const newStockAdjustment = DrSgStockAdjustment.build({
      amount,
      date,
      ProductId,
      description,
    });
    await newStockAdjustment.save();

    res.json({ message: "Success", data: newStockAdjustment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
