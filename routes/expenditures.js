const router = require("express").Router();
const {
  sequelize: {
    models: { Expense, Expenditure },
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

    const expenditures = await Expenditure.findAll({
      include: [{ model: Expense }],
      where: whereClause,
    });
    res.json({ data: expenditures });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      date,
      description,
      paid,
      amount,
      qty,
      unit,
      ExpenseId,
      DeliveryId,
    } = req.body;
    const newExpenditure = Expenditure.build({
      date,
      description,
      paid,
      amount,
      qty,
      unit,
      ExpenseId,
      DeliveryId,
    });
    await newExpenditure.save();

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
          model: Expense,
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
    const { date, description, paid, amount, qty, unit, ExpenseId } = req.body;
    const { id } = req.params;

    const expenditure = await Expenditure.findByPk(id, {
      include: [{ model: ExpenseDetail, include: Expense }],
    });

    await expenditure.update(
      { date, description, paid, amount, qty, unit, ExpenseId },
      {
        where: {
          id: id,
        },
      }
    );

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
      include: [{ model: Expense }],
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
