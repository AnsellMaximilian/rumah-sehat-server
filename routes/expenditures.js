const router = require("express").Router();
const {
  sequelize: {
    models: { Expense, Expenditure, ExpenseDetail },
    query,
  },
  sequelize,
} = require("../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const whereClause = {};

    const expenditures = await Expenditure.findAll({
      include: [{ model: ExpenseDetail, include: [Expense] }],
      where: whereClause,
    });
    res.json({ data: expenditures });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, deliveryCost, note, expenseDetails } = req.body;
    const newExpenditure = Expenditure.build({
      date,
      deliveryCost,
      note,
    });
    await newExpenditure.save();

    for (const expenseDetail of expenseDetails) {
      const { amount, qty, unit, ExpenseId } = expenseDetail;

      await newExpenditure.createExpenseDetail({
        amount,
        qty,
        unit,
        ExpenseId,
      });
    }

    res.json({ message: "Success", data: newExpenditure });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id/pay", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenditure = await Expenditure.findByPk(id, {
      include: [
        {
          model: ExpenseDetail,
          include: [{ model: Expense }],
        },
      ],
    });
    expenditure.update({
      paid: !expenditure.paid,
    });
    res.json({ data: expenditure });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, deliveryCost, note, expenseDetails } = req.body;
    const { id } = req.params;

    const expenditure = await Expenditure.findByPk(id, {
      include: [{ model: ExpenseDetail, include: Expense }],
    });

    await expenditure.update(
      { date, deliveryCost, note },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete delivery details
    await ExpenseDetail.destroy({
      where: {
        ExpenditureId: expenditure.id,
      },
    });

    // replace delivery details
    for (const expenseDetail of expenseDetails) {
      const { amount, qty, unit, ExpenseId } = expenseDetail;

      await expenditure.createExpenseDetail({
        amount,
        qty,
        unit,
        ExpenseId,
      });
    }

    res.json({ data: expenditure });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenditure = await Expenditure.findByPk(id, {
      include: [{ model: ExpenseDetail, include: [Expense] }],
    });
    if (!expenditure) throw `Can't find expenditure with id ${id}`;
    res.json({ data: expenditure });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expenditure = await Expenditure.findByPk(id);
    await expenditure.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: expenditure });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
