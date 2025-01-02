const router = require("express").Router();
const { Op } = require("sequelize");
const path = require("path");
const moment = require("moment");
const {
  sequelize: {
    models: {
      Product,
      ProductCategory,
      Supplier,
      PurchaseDetail,
      DeliveryDetail,
      Purchase,
      Delivery,
      Draw,
      Customer,
      StockAdjustment,
    },
  },
  sequelize,
} = require("../../models/index");

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const draw = await Draw.findByPk(id);
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

    const newDraw = Draw.build({
      amount,
      date,
      ProductId,
      description,
    });
    await newDraw.save();

    res.json({ message: "Success", data: newDraw });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk-draw", async (req, res, next) => {
  try {
    const { draws } = req.body;

    const savedDraws = [];

    for (const draw of draws) {
      const { amount, date, description, ProductId } = draw;

      const newDraw = Draw.build({
        amount,
        date,
        ProductId,
        description,
      });
      await newDraw.save();

      savedDraws.push(newDraw);
    }

    res.json({ message: "Success", data: savedDraws });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
