const router = require("express").Router();
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");
const path = require("path");
const {
  sequelize,
  sequelize: {
    models: { Delivery, DeliveryDetail, Customer, Product, Supplier },
  },
} = require("../../models/index");
const moment = require("moment");
const { readSheet, writeDataToSheet } = require("../../helpers/sheets");

router.get("/export-to-sheets", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    const products = await Product.findAll();
    const suppliers = await Supplier.findAll();
    const deliveryDetails = await DeliveryDetail.findAll({
      include: [
        { model: Delivery },
        { model: Product, include: [{ model: Supplier }] },
      ],
    });

    const customersData = customers.map((cus) => [cus.id, cus.fullName, cus.phone, cus.address]);
    const suppliersData = suppliers.map((sup) => [sup.id, sup.name]);
    const productsData = products.map((prod) => [
      prod.id,
      prod.name,
      prod.cost,
      prod.price,
      prod.SupplierId,
    ]);

    const salesData = deliveryDetails.map((detail) => {
      return [
        detail.id,
        detail.Delivery.date,
        detail.Delivery.CustomerId,
        detail.ProductId,
        detail.cost,
        detail.price,
        parseFloat(detail.qty),
      ];
    });

    await writeDataToSheet(salesData, "salesData", "A2");
    await writeDataToSheet(productsData, "products", "A2");
    await writeDataToSheet(suppliersData, "suppliers", "A2");
    await writeDataToSheet(customersData, "customers", "A2");
    await writeDataToSheet(
      [[moment().format("YYYY-MM-DD hh:mm:ss")]],
      "metadata",
      "A2:A2"
    );
    res.json({ data: { status: "success" } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
