const router = require("express").Router();
const {
  sequelize: {
    models: { Expense, Expenditure, Transaction, PurchaseInvoice, Supplier },
    query,
  },
  sequelize,
} = require("../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");
const { TRANSACTIONS } = require("../const");

router.get("/", async (req, res, next) => {
  try {
    const { startDate, endDate, category } = req.query;

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

    if (category) {
      whereClause.category = category;
    }

    const transactions = await Transaction.findAll({
      include: [{ model: PurchaseInvoice, include: [Supplier] }],
      where: whereClause,
    });
    res.json({ data: transactions });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, description, amount, PurchaseInvoiceId, category } = req.body;
    const newTransaction = Transaction.build({
      date,
      description,
      amount,
      PurchaseInvoiceId,
      category: category ? category : TRANSACTIONS.ANSELL,
    });
    await newTransaction.save();

    if (PurchaseInvoiceId) {
      const purchaseInvoice = await PurchaseInvoice.findByPk(
        PurchaseInvoiceId,
        {
          include: [],
        }
      );
      await purchaseInvoice.update({
        paid: !purchaseInvoice.paid,
      });
    }

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
      include: [{ model: PurchaseInvoice, include: [Supplier] }],
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

router.get("/delivery-balance", async (req, res, next) => {
  try {
    const [balance] = await sequelize.query(
      `
      SELECT 
      (COALESCE((SELECT SUM(t.amount) 
                FROM "Transactions" t 
                WHERE t.category = 'SITI_DELIVERY' 
                AND t."date" >= '2025-02-03'), 0)
      - 
      COALESCE((SELECT SUM(d.cost) 
                FROM "Deliveries" d 
                WHERE d."DeliveryTypeId" IN (16, 17, 18, 19) 
                AND d."date" >= '2025-02-03'), 0)
      ) AS balance;

      `
    );

    res.json({ data: balance[0].balance });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [{ model: PurchaseInvoice, include: [Supplier] }],
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
