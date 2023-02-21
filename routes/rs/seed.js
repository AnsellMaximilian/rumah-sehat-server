const router = require("express").Router();
const {
  sequelize: {
    models: { Product, Customer, Supplier, DeliveryType, ProductCategory },
  },
} = require("../../models/index");
const { suppliersAndProducts, customers } = require("../../seeders");

router.get("/", async (req, res, next) => {
  try {
    await suppliersAndProducts();
    await customers();
    res.json({ data: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
