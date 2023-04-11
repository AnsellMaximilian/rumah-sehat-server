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
    const deliveryDetails = await DeliveryDetail.findAll({
      include: [
        { model: Delivery, include: [{ model: Customer }] },
        { model: Product, include: [{ model: Supplier }] },
      ],
    });

    const salesData = deliveryDetails.map((detail) => {
      return [
        detail.id,
        detail.Delivery.date,
        detail.Delivery.Customer.fullName,
        detail.Product.Supplier.name,
        detail.ProductId,
        detail.Product.name,
        detail.price,
        detail.cost,
        parseFloat(detail.qty),
      ];
    });

    await writeDataToSheet(salesData);
    res.json({ data: { status: "success" } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
