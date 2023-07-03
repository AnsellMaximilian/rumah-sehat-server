const router = require("express").Router();
const { Op } = require("sequelize");
const path = require("path");
const moment = require("moment");
const {
  sequelize: {
    models: {
      Product,
      ProductCategory,
      Supplier,
      PurchaseDetail,
      DeliveryDetail,
      Expense,
    },
  },
} = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const expenses = await Expense.findAll({
      order: [["name", "ASC"]],
      where: whereClause,
    });
    res.json({ data: expenses });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, amount, unit, description } = req.body;

    const newExpense = Expense.build({
      name,
      amount,
      unit,
      description,
    });
    await newExpense.save();

    res.json({ message: "Success", data: newExpense });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id, {
      //   include: [PurchaseDetail, DeliveryDetail],
    });
    if (!expense) throw `Can't find expense with id ${id}`;
    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, amount, unit, description } = req.body;

    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    await expense.update(
      { name, amount, unit, description },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    // if (product.Products.length > 0) !!!
    //   throw "Cannot delete. Supplier has associated products.";
    await expense.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
