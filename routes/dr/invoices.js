const router = require("express").Router();
const path = require("path");
const {
  sequelize: {
    models: {
      DrInvoice,
      DrIdDelivery,
      DrSgDelivery,
      DrIdDeliveryDetail,
      DrSgDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrIdItem,
      DrSgItem,
    },
  },
} = require("../../models/index");
const { createPDFStream } = require("../../helpers/pdfGeneration");

router.get("/", async (req, res) => {
  try {
    const { paid, unpaid } = req.query;
    const whereClause = {};

    if (paid) {
      whereClause.paid = true;
    }
    if (unpaid) {
      whereClause.paid = false;
    }

    const invoices = await DrInvoice.findAll({
      include: [
        { model: Customer },
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
      ],
      where: whereClause,
    });
    res.json({ data: invoices });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { date, note, DrIdDeliveryIds, DrSgDeliveryIds, CustomerId } =
//       req.body;

//     if (DrIdDeliveryIds.length === 0 && DrSgDeliveryIds.length === 0)
//       throw "Pick atleast 1 delivery to invoice.";

//     const newInvoice = DrInvoice.build({
//       date,
//       note,
//       CustomerId,
//     });
//     await newInvoice.save();

//     const idDeliveries = await DrIdDelivery.findAll({
//       where: {
//         id: DrIdDeliveryIds,
//         DrInvoiceId: null,
//       },
//     });

//     await newInvoice.addDrIdDeliveries(idDeliveries);

//     const sgDeliveries = await DrSgDelivery.findAll({
//       where: {
//         id: DrSgDeliveryIds,
//         DrInvoiceId: null,
//       },
//     });

//     await newInvoice.addDrSgDeliveries(sgDeliveries);

//     res.json({ message: "Success", data: newInvoice });
//   } catch (error) {
//     res.json({ error });
//   }
// });
router.post("/", async (req, res, next) => {
  try {
    const { date, note, CustomerId } = req.body;

    const newInvoice = DrInvoice.build({
      date,
      note,
      CustomerId,
    });
    await newInvoice.save();

    res.json({ message: "Success", data: newInvoice });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await DrInvoice.findByPk(id, {
      include: [
        {
          model: Customer,
        },
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
      ],
    });
    if (!invoice) throw `Can't find item with id ${id}`;
    res.json({ data: invoice });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id/print", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await DrInvoice.findByPk(id, {
      include: [
        {
          model: Customer,
        },
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
      ],
    });
    if (!invoice) throw `Can't find item with id ${id}`;

    const invoiceJSON = invoice.toJSON();

    const pdfStream = await createPDFStream(
      path.join(__dirname, "..", "..", "templates", "dr-secret-invoice.hbs"),
      {
        invoice: {
          ...invoiceJSON,
          hasIdDeliveries: invoiceJSON.DrIdDeliveries.length > 0,
          hasSgDeliveries: invoiceJSON.DrSgDeliveries.length > 0,
        },
      }
    );

    pdfStream.pipe(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await DrInvoice.findByPk(id);
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

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { date, note, CustomerId } = req.body;

    const invoice = await DrInvoice.findByPk(id, {
      include: [
        {
          model: Customer,
        },
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
      ],
    });

    await invoice.update(
      {
        date,
        note,
        CustomerId,
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

module.exports = router;
