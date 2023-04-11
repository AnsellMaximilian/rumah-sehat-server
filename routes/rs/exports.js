const router = require("express").Router();
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");
const path = require("path");
const {
  sequelize,
  sequelize: {
    models: { Delivery, DeliveryDetail, Customer, Product },
  },
} = require("../../models/index");
const moment = require("moment");
const { readSheet, writeDataToSheet } = require("../../helpers/sheets");

router.get("/export-to-sheets", async (req, res, next) => {
  try {
    const deliveryDetails = await DeliveryDetail.findAll({
      include: [
        { model: Delivery, include: [{ model: Customer }] },
        { model: Product },
      ],
    });

    const salesData = deliveryDetails.map((detail) => {
      return [
        detail.id,
        detail.Delivery.date,
        detail.ProductId,
        detail.Product.name,
        detail.Delivery.Customer.fullName,
        parseFloat(detail.qty),
        detail.price,
        detail.cost,
      ];
    });

    await writeDataToSheet(salesData);
    res.json({ data: { status: "success" } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
