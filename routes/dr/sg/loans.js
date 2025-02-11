const router = require("express").Router();
const { Op } = require("sequelize");
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: { DrSgItem, Customer, DrSgLoan, DrSgBundle, DrSgBundleItem },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { CustomerId, DrSgItemId, lendType } = req.query;
    const whereClause = {};
    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }
    if (DrSgItemId) {
      whereClause.DrSgItemId = DrSgItemId;
    }
    if (lendType) {
      whereClause.lendType = lendType;
    }

    const loans = await DrSgLoan.findAll({
      where: whereClause,
      include: [Customer, DrSgItem],
    });
    res.json({ data: loans });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, qty, lendType, note, CustomerId, DrSgItemId } = req.body;

    const newLoan = DrSgLoan.build({
      date,
      qty,
      lendType,
      note,
      isReturned: false,
      CustomerId,
      DrSgItemId,
    });
    await newLoan.save();

    res.json({ message: "Success", data: newLoan });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const { loanItems } = req.body;
    const newLoans = await DrSgLoan.bulkCreate(
      loanItems.map((loan) => {
        const { date, qty, lendType, note, CustomerId, DrSgItemId } = loan;
        return {
          date,
          qty,
          lendType,
          note,
          isReturned: false,
          CustomerId,
          DrSgItemId,
        };
      })
    );
    res.json({ message: "Success", data: newLoans });
  } catch (error) {
    next(error);
  }
});

router.get("/bundle", async (req, res, next) => {
  try {
    const { CustomerId, DrSgItemId, lendType } = req.query;
    const whereClause = {};
    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }

    if (lendType) {
      whereClause.lendType = lendType;
    }

    const bundleItemWhereClause = {};

    if (DrSgItemId) bundleItemWhereClause.DrSgItemId = DrSgItemId;

    const bundleItems = await DrSgBundleItem.findAll({
      where: bundleItemWhereClause,
      include: [DrSgBundle, DrSgItem],
    });

    const loans = await DrSgLoan.findAll({
      where: {
        DrSgItemId: {
          [Op.in]: bundleItems.map((bi) => bi.DrSgBundle.DrSgItemId),
        },
      },
      include: [Customer, DrSgItem],
    });
    res.json({ data: loans });
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const item = await DrSgItem.findByPk(id);
//     if (!item) throw `Can't find item with id ${id}`;
//     res.json({ data: item });
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/:id/return", async (req, res, next) => {
  try {
    const { returnDate } = req.body;
    const { id } = req.params;
    const loan = await DrSgLoan.findByPk(id);
    console.log({ id, loan });
    await loan.update({
      isReturned: true,
      returnDate,
    });

    res.json({ message: "Success", data: loan });
  } catch (error) {
    next(error);
  }
});

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { name, priceRP, points, keepStockSince } = req.body;
//     const { id } = req.params;

//     const item = await DrSgItem.findByPk(id);

//     await item.update(
//       { name, priceRP, points, keepStockSince },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     res.json({ data: item });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const loan = await DrSgLoan.findByPk(id);
    await loan.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: loan });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
