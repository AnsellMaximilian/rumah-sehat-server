const router = require("express").Router();
const {
  sequelize: {
    models: { Expense, Expenditure, Transaction, PurchaseInvoice },
    query,
  },
  sequelize,
} = require("../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const whereClause = {};
    if (startDate) {
      whereClause.date = {
        [Op.gte]: startDate,
      };
    }

    if (endDate) {
      whereClause.date = {
        ...whereClause.date,
        [Op.lte]: endDate,
      };
    }

    const transactions = await Transaction.findAll({
      include: [{ model: PurchaseInvoice }],
      where: whereClause,
    });
    res.json({ data: transactions });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, description, amount, PurchaseInvoiceId } = req.body;
    const newTransaction = Transaction.build({
      date,
      description,
      amount,
      PurchaseInvoiceId,
    });
    await newTransaction.save();

    res.json({ message: "Success", data: newTransaction });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, description, amount, PurchaseInvoiceId } = req.body;
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
      include: [{ model: PurchaseInvoice }],
    });

    await transaction.update(
      { date, description, amount, PurchaseInvoiceId },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: transaction });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [{ model: PurchaseInvoice }],
    });
    if (!transaction) throw `Can't find transaction with id ${id}`;
    res.json({ data: transaction });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    await transaction.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: transaction });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
