const router = require("express").Router();
const { Op } = require("sequelize");
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: {
      DrIdItem,
      DrIdDeliveryDetail,
      DrIdStockAdjustment,
      DrIdDelivery,
      Customer,
      DrIdBundle,
      DrIdBundleItem,
      DrIdLoan,
    },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { CustomerId, DrIdItemId, lendType } = req.query;
    const whereClause = {};
    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }
    if (DrIdItemId) {
      whereClause.DrIdItemId = DrIdItemId;
    }
    if (lendType) {
      whereClause.lendType = lendType;
    }

    const loans = await DrIdLoan.findAll({
      where: whereClause,
      include: [Customer, DrIdItem],
    });
    res.json({ data: loans });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, qty, lendType, note, CustomerId, DrIdItemId } = req.body;

    const newLoan = DrIdLoan.build({
      date,
      qty,
      lendType,
      note,
      isReturned: false,
      CustomerId,
      DrIdItemId,
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

    const newLoans = await DrIdLoan.bulkCreate(
      loanItems.map((loan) => {
        const { date, qty, lendType, note, CustomerId, DrIdItemId } = loan;
        return {
          date,
          qty,
          lendType,
          note,
          isReturned: false,
          CustomerId,
          DrIdItemId,
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
    const { CustomerId, DrIdItemId, lendType } = req.query;
    const whereClause = {};
    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }

    if (lendType) {
      whereClause.lendType = lendType;
    }

    const bundleItemWhereClause = {};

    if (DrIdItemId) bundleItemWhereClause.DrIdItemId = DrIdItemId;

    const bundleItems = await DrIdBundleItem.findAll({
      where: bundleItemWhereClause,
      include: [DrIdBundle, DrIdItem],
    });

    const loans = await DrIdLoan.findAll({
      where: {
        DrIdItemId: {
          [Op.in]: bundleItems.map((bi) => bi.DrIdBundle.DrIdItemId),
        },
      },
      include: [Customer, DrIdItem],
    });
    res.json({ data: loans });
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const item = await DrIdItem.findByPk(id);
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
    const loan = await DrIdLoan.findByPk(id);
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

//     const item = await DrIdItem.findByPk(id);

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
    const loan = await DrIdLoan.findByPk(id);
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
