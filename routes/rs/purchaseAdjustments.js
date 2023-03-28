const router = require("express").Router();
const {
  sequelize: {
    models: {
      Supplier,
      Customer,
      Invoice,
      Adjustment,
      PurchaseAdjustment,
      Purchase,
    },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { SupplierId } = req.query;
    const whereClause = {};

    if (SupplierId) {
      whereClause.SupplierId = SupplierId;
    }
    const adjustments = await PurchaseAdjustment.findAll({
      include: ["SourcePurchase", Adjustment],
      where: whereClause,
    });
    res.json({ data: adjustments });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      description,
      amount,
      date,
      SourcePurchaseId,
      AdjustmentId,
      SupplierId,
    } = req.body;

    const purchase = await Purchase.findByPk(SourcePurchaseId);

    if (SourcePurchaseId && purchase.SupplierId !== SupplierId)
      throw new Error("Purchase source doesn't belong to this supplier.");

    const adjustment = PurchaseAdjustment.build({
      description,
      amount,
      date,
      SourcePurchaseId,
      AdjustmentId,
      SupplierId,
    });
    await adjustment.save();

    res.json({ message: "Success", data: adjustment });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const adjustment = await PurchaseAdjustment.findByPk(id, {
      include: [Supplier, "SourcePurchase", Adjustment],
    });
    if (!adjustment) throw `Can't find adjustment with id ${id}`;
    res.json({ data: adjustment });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const {
      description,
      amount,
      date,
      SourcePurchaseId,
      AdjustmentId,
      SupplierId,
    } = req.body;
    const { id } = req.params;

    const adjustment = await PurchaseAdjustment.findByPk(id);

    const purchase = await Purchase.findByPk(SourcePurchaseId);

    if (SourcePurchaseId && purchase.SupplierId !== SupplierId)
      throw new Error("Purchase source doesn't belong to this supplier.");

    await adjustment.update(
      {
        description,
        amount,
        date,
        SourcePurchaseId,
        AdjustmentId,
        SupplierId,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: adjustment });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const adjustment = await PurchaseAdjustment.findByPk(id);
    await adjustment.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: adjustment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
