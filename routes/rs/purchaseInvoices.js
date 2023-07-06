const router = require("express").Router();
const {
  sequelize: {
    models: {
      Purchase,
      PurchaseDetail,
      Product,
      Supplier,
      Delivery,
      Customer,
      PurchaseInvoice,
    },
    query,
  },
  sequelize,
} = require("../../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const { SupplierId } = req.query;
    const whereClause = {};

    if (SupplierId) {
      whereClause.SupplierId = SupplierId;
    }
    const purchases = await PurchaseInvoice.findAll({
      include: [
        {
          model: Purchase,
          include: [PurchaseDetail],
        },
        { model: Supplier },
      ],
      where: whereClause,
    });
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { date, note, SupplierId, purchaseIds } = req.body;
    const newPurchaseInvoice = PurchaseInvoice.build({
      date,
      note,
      SupplierId,
      paid: false,
    });
    await newPurchaseInvoice.save();

    const purchases = await Purchase.findAll({
      where: {
        id: purchaseIds,
      },
    });

    await newPurchaseInvoice.addPurchases(purchases);

    res.json({ message: "Success", data: newPurchaseInvoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id/pay", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchaseInvoice = await PurchaseInvoice.findByPk(id, {
      include: [],
    });
    purchaseInvoice.update({
      paid: !purchaseInvoice.paid,
    });
    res.json({ data: purchaseInvoice });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, note, SupplierId, purchaseIds } = req.body;
    const { id } = req.params;

    const purchaseInvoice = await PurchaseInvoice.findByPk(id, {
      include: [
        {
          model: Purchase,
          include: [PurchaseDetail],
        },
        { model: Supplier },
      ],
    });

    await purchaseInvoice.update(
      {
        date,
        note,
        SupplierId,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const purchases = await Purchase.findAll({
      where: {
        id: purchaseIds,
      },
    });

    await purchaseInvoice.setPurchases(purchases);

    res.json({ data: purchaseInvoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await PurchaseInvoice.findByPk(id, {
      include: [
        {
          model: Purchase,
          include: [PurchaseDetail],
        },
        { model: Supplier },
      ],
    });
    if (!purchase) throw `Can't find purchase invoice with id ${id}`;
    res.json({ data: purchase });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await PurchaseInvoice.findByPk(id);
    await purchase.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: purchase });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
