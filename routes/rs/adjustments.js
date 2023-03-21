const router = require("express").Router();
const {
  sequelize: {
    models: { Product, Customer, Invoice, Adjustment },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const adjustments = await Adjustment.findAll({
      include: ["SourceInvoice", "AdjustedInvoice", Customer],
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
      SourceInvoiceId,
      AdjustedInvoiceId,
      CustomerId,
    } = req.body;

    if (
      SourceInvoiceId &&
      AdjustedInvoiceId &&
      SourceInvoiceId === AdjustedInvoiceId
    )
      throw new Error("Source invoice and adjusted invoice are the same.");

    const source = await Invoice.findByPk(SourceInvoiceId);
    const adjusted = await Invoice.findByPk(AdjustedInvoiceId);

    if ((SourceInvoiceId && !source) || (AdjustedInvoiceId && !adjusted))
      throw new Error("Invoice doesn't exist.");

    if (source && source.status !== "paid")
      throw new Error("Only paid invoices can be set as source.");
    if (adjusted && adjusted.status === "paid")
      throw new Error("Only non paid invoices can be adjusted.");

    const adjustment = Adjustment.build({
      description,
      amount,
      SourceInvoiceId,
      AdjustedInvoiceId,
      CustomerId,
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
    const adjustment = await Adjustment.findByPk(id, {
      include: [
        { model: Invoice, as: "SourceInvoice", include: Customer },
        { model: Invoice, as: "AdjustedInvoice", include: Customer },
        Customer,
      ],
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
      SourceInvoiceId,
      AdjustedInvoiceId,
      CustomerId,
    } = req.body;
    const { id } = req.params;

    const adjustment = await Adjustment.findByPk(id);

    if (
      SourceInvoiceId &&
      AdjustedInvoiceId &&
      SourceInvoiceId === AdjustedInvoiceId
    )
      throw new Error("Source invoice and adjusted invoice are the same.");

    const source = await Invoice.findByPk(SourceInvoiceId);
    const adjusted = await Invoice.findByPk(AdjustedInvoiceId);

    if ((SourceInvoiceId && !source) || (AdjustedInvoiceId && !adjusted))
      throw new Error("Invoice doesn't exist.");

    if (source && source.status !== "paid")
      throw new Error("Only paid invoices can be set as source.");
    if (source && adjusted.status === "paid")
      throw new Error("Only non paid invoices can be adjusted.");

    await adjustment.update(
      { description, amount, SourceInvoiceId, AdjustedInvoiceId, CustomerId },
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
    const adjustment = await Adjustment.findByPk(id);
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
