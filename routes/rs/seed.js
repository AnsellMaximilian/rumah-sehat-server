const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      Product,
      Customer,
      Supplier,
      DeliveryType,
      ProductCategory,
      Purchase,
      Delivery,
    },
  },
} = require("../../models/index");
const { suppliersAndProducts, customers } = require("../../seeders");

router.get("/", async (req, res, next) => {
  try {
    // await suppliersAndProducts();
    // await customers();
    res.json({ data: true });
  } catch (error) {
    next(error);
  }
});

router.get("/test", async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [{ model: Delivery }],
      where: {
        DeliveryId: {
          [Op.not]: null,
        },
      },
    });
    for (const purchase of purchases) {
      await purchase.Delivery.update({
        PurchaseId: purchase.id,
      });
    }
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
