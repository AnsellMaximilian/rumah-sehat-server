const router = require("express").Router();
const path = require("path");

const {
  sequelize: {
    models: {
      Invoice,
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Purchase,
      PurchaseDetail,
      Adjustment,
    },
  },
} = require("../../models/index");
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const {
      active,
      status,
      CustomerId,
      deliveriesStartDate,
      deliveriesEndDate,
      invoiceStartDate,
      invoiceEndDate,
    } = req.query;
    const whereClause = {};
    const deliveriesWhereClause = {};
    if (active) {
      whereClause.status = {
        [Op.not]: "paid",
      };
    }

    if (status) {
      whereClause.status = status;
    }

    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }

    if (deliveriesStartDate) {
      deliveriesWhereClause.date = {
        [Op.gte]: deliveriesStartDate,
      };
    }

    if (deliveriesEndDate) {
      deliveriesWhereClause.date = {
        ...deliveriesWhereClause.date,
        [Op.lte]: deliveriesEndDate,
      };
    }

    if (invoiceStartDate) {
      whereClause.date = {
        [Op.gte]: invoiceStartDate,
      };
    }

    if (invoiceEndDate) {
      whereClause.date = {
        ...whereClause.date,
        [Op.lte]: invoiceEndDate,
      };
    }
    const invoices = await Invoice.findAll({
      include: [
        {
          model: Adjustment,
          as: "SourcedInvoiceAdjustments",
        },
        {
          model: Adjustment,
          as: "InvoiceAdjustments",
        },

        {
          model: Delivery,
          include: [
            { model: DeliveryDetail, include: Product },
            Customer,
            DeliveryType,
          ],
          where: deliveriesWhereClause,
        },
        { model: Customer },
      ],
      where: whereClause,
    });
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { CustomerId, date, note, status } = req.body;
    const newInvoice = Invoice.build({
      date,
      note,
      CustomerId,
      status,
    });
    await newInvoice.save();

    res.json({ message: "Success", data: newInvoice });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:id/pay", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Adjustment,
          as: "SourcedInvoiceAdjustments",
        },
        {
          model: Adjustment,
          as: "InvoiceAdjustments",
        },

        {
          model: Delivery,
          include: [
            { model: DeliveryType },
            { model: DeliveryDetail, include: Product },
          ],
        },
        { model: Customer },
      ],
    });
    invoice.update({
      status: invoice.paid ? "pending" : "paid",
    });
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { CustomerId, date, note, status } = req.body;

    const { id } = req.params;

    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Adjustment,
          as: "SourcedInvoiceAdjustments",
        },
        {
          model: Adjustment,
          as: "InvoiceAdjustments",
        },

        {
          model: Delivery,
          include: [
            { model: DeliveryType },
            { model: DeliveryDetail, include: Product },
          ],
        },
        { model: Customer },
      ],
    });

    await invoice.update(
      {
        date,
        note,
        CustomerId,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: invoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Adjustment,
          as: "SourcedInvoiceAdjustments",
        },
        {
          model: Adjustment,
          as: "InvoiceAdjustments",
        },

        {
          model: Delivery,
          include: [
            { model: DeliveryDetail, include: Product },
            { model: Customer },
            { model: DeliveryType },
          ],
        },
        { model: Customer },
      ],
    });
    if (!invoice) throw `Can't find invoice with id ${id}`;
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id);
    if (invoice.status !== "draft")
      throw `Can't delete: This invoice is ${invoice.status}. Make sure invoice status is 'draft'.`;
    await invoice.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/print", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Adjustment,
          as: "SourcedInvoiceAdjustments",
        },
        {
          model: Adjustment,
          as: "InvoiceAdjustments",
        },

        {
          model: Customer,
        },
        {
          model: Delivery,
          include: [
            { model: DeliveryDetail, include: Product },
            { model: Customer },
            { model: DeliveryType },
          ],
        },
      ],
    });
    if (!invoice) throw `Can't find item with id ${id}`;

    const invoiceJSON = invoice.toJSON();

    // const pdfStream = await createPDFStream(
    //   path.join(__dirname, "..", "..", "templates", "rs-invoice2.hbs"),
    //   {
    //     invoice: {
    //       ...invoiceJSON,
    //     },
    //   }
    // );

    // pdfStream.pipe(res);

    const html = generateHTML(
      path.join(__dirname, "..", "..", "templates", "rs-invoice2.hbs"),
      {
        invoice: {
          ...invoiceJSON,
        },
      }
    );
    res.end(html);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
