const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const {
  sequelize: {
    models: {
      DrInvoice,
      DrInvoiceCollection,
      DrInvoiceCollectionAdjustment,
      DrIdDelivery,
      DrSgDelivery,
      DrMyDelivery,
      DrIdDeliveryDetail,
      DrSgDeliveryDetail,
      DrMyDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrIdItem,
      DrSgItem,
      DrMyItem,
    },
  },
} = require("../../models/index");
const { createPDFStream } = require("../../helpers/pdfGeneration");
const { Op } = require("sequelize");

// List collections
router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate, CustomerId } = req.query;
    const whereClause = {};
    if (startDate) whereClause.date = { [Op.gte]: startDate };
    if (endDate)
      whereClause.date = { ...(whereClause.date || {}), [Op.lte]: endDate };

    const include = [
      {
        model: DrInvoice,
        include: [
          { model: Customer },
          { model: DrDiscountModel },
          {
            model: DrIdDelivery,
            include: [
              { model: DrIdDeliveryDetail, include: DrIdItem },
              Customer,
              DrDiscountModel,
            ],
          },
          {
            model: DrSgDelivery,
            include: [
              { model: DrSgDeliveryDetail, include: DrSgItem },
              Customer,
              DrDiscountModel,
            ],
          },
          {
            model: DrMyDelivery,
            include: [
              { model: DrMyDeliveryDetail, include: DrMyItem },
              Customer,
              DrDiscountModel,
            ],
          },
        ],
        ...(CustomerId ? { where: { CustomerId } } : {}),
      },
      { model: DrInvoiceCollectionAdjustment },
    ];

    const collections = await DrInvoiceCollection.findAll({
      include,
      where: whereClause,
      order: [["id", "ASC"]],
    });

    res.json({ data: collections });
  } catch (error) {
    next(error);
  }
});

// Create collection
router.post("/", async (req, res, next) => {
  try {
    const { date, note } = req.body;
    const collection = await DrInvoiceCollection.create({ date, note });
    res.json({ message: "Success", data: collection });
  } catch (error) {
    next(error);
  }
});

// Get one
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await DrInvoiceCollection.findByPk(id, {
      include: [
        {
          model: DrInvoice,
          include: [
            { model: Customer },
            { model: DrDiscountModel },
            {
              model: DrIdDelivery,
              include: [
                { model: DrIdDeliveryDetail, include: DrIdItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrSgDelivery,
              include: [
                { model: DrSgDeliveryDetail, include: DrSgItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrMyDelivery,
              include: [
                { model: DrMyDeliveryDetail, include: DrMyItem },
                Customer,
                DrDiscountModel,
              ],
            },
          ],
        },
        { model: DrInvoiceCollectionAdjustment },
      ],
    });
    if (!collection) throw `Can't find collection with id ${id}`;
    res.json({ data: collection });
  } catch (error) {
    next(error);
  }
});

// Update metadata and set invoices
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, note, invoiceIds } = req.body;

    const collection = await DrInvoiceCollection.findByPk(id, {
      include: [{ model: DrInvoice }, { model: DrInvoiceCollectionAdjustment }],
    });
    if (!collection) throw `Can't find collection with id ${id}`;

    await collection.update({ date, note });

    if (invoiceIds) {
      const invoices = await DrInvoice.findAll({ where: { id: invoiceIds } });
      await collection.setDrInvoices(invoices);
    }

    const updated = await DrInvoiceCollection.findByPk(id, {
      include: [{ model: DrInvoice }, { model: DrInvoiceCollectionAdjustment }],
    });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});

// Add adjustment
router.post("/:id/adjustments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;
    const collection = await DrInvoiceCollection.findByPk(id);
    if (!collection) throw `Can't find collection with id ${id}`;
    const adjustment = await DrInvoiceCollectionAdjustment.create({
      description,
      amount,
      date,
      DrInvoiceCollectionId: collection.id,
    });
    res.json({ message: "Success", data: adjustment });
  } catch (error) {
    next(error);
  }
});

// Delete adjustment
router.delete("/adjustments/:adjustmentId", async (req, res, next) => {
  try {
    const { adjustmentId } = req.params;
    const adjustment = await DrInvoiceCollectionAdjustment.findByPk(adjustmentId);
    if (!adjustment) throw `Can't find adjustment with id ${adjustmentId}`;
    await adjustment.destroy();
    res.json({ data: adjustment });
  } catch (error) {
    next(error);
  }
});

// Print combined PDF
router.get("/:id/print", async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await DrInvoiceCollection.findByPk(id, {
      include: [
        {
          model: DrInvoice,
          include: [
            { model: Customer },
            { model: DrDiscountModel },
            {
              model: DrIdDelivery,
              include: [
                { model: DrIdDeliveryDetail, include: DrIdItem },
                { model: Customer },
                { model: DrDiscountModel },
              ],
            },
            {
              model: DrSgDelivery,
              include: [
                { model: DrSgDeliveryDetail, include: DrSgItem },
                { model: Customer },
                { model: DrDiscountModel },
              ],
            },
            {
              model: DrMyDelivery,
              include: [
                { model: DrMyDeliveryDetail, include: DrMyItem },
                { model: Customer },
                { model: DrDiscountModel },
              ],
            },
          ],
          order: [["id", "ASC"]],
        },
        { model: DrInvoiceCollectionAdjustment },
      ],
      order: [["id", "ASC"]],
    });
    if (!collection) throw `Can't find collection with id ${id}`;

    const collJSON = collection.toJSON();
    const invoicesWithFlags = (collJSON.DrInvoices || []).map((inv) => ({
      ...inv,
      hasIdDeliveries: (inv.DrIdDeliveries || []).length > 0,
      hasSgDeliveries: (inv.DrSgDeliveries || []).length > 0,
      hasMyDeliveries: (inv.DrMyDeliveries || []).length > 0,
    }));

    const pdfStream = await createPDFStream(
      path.join(
        __dirname,
        "..",
        "..",
        "templates",
        "dr-invoice-collection.hbs"
      ),
      {
        collection: {
          ...collJSON,
          DrInvoices: invoicesWithFlags,
        },
      }
    );

    pdfStream.pipe(res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

