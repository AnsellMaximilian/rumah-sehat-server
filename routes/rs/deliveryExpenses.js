const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Invoice,
      PurchaseDetail,
      Purchase,
      DeliveryExpense,
      DeliveryExpenseDetail,
      Expense,
    },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { deliveryId } = req.query;

    // if (deliveryId) {
    //   const delivery = await Delivery.findByPk(deliveryId, {
    //     include: [
    //       {
    //         model: DeliveryDetail,
    //         include: [
    //           {
    //             model: DeliveryExpenseDetail,
    //             include: [{ model: DeliveryExpense, include: [Expense] }],
    //           },
    //         ],
    //       },
    //       Customer,
    //       DeliveryType,
    //       {
    //         model: Invoice,
    //         include: [Customer, { model: Delivery, include: DeliveryDetail }],
    //       },
    //       Purchase,
    //     ],
    //   });
    //   const expenses = delivery.DeliveryDetails.reduce(
    //     (allExpenses, detail) => {
    //       return [
    //         ...allExpenses,
    //         ...detail.DeliveryExpenseDetails.filter(
    //           (det) =>
    //             !allExpenses.some((ex) => ex.id === det.DeliveryExpenseId)
    //         ).map((det) => det.DeliveryExpense),
    //       ];
    //     },
    //     []
    //   );
    //   console.log(expenses);
    //   return res.json({
    //     data: expenses,
    //   });
    // }

    const deliveryExpenses = await DeliveryExpense.findAll({
      include: [
        {
          model: DeliveryExpenseDetail,
          include: [{ model: DeliveryDetail, include: Delivery }],
        },
        Expense,
      ],
    });
    res.json({
      data: deliveryExpenses.filter(
        (ex) =>
          !!!deliveryId ||
          ex.DeliveryExpenseDetails.every(
            (exDet) => exDet.DeliveryDetail.DeliveryId
          )
      ),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { ExpenseId, qty, amount, unit, detailIds } = req.body;

    const newDeliveryExpense = DeliveryExpense.build({
      ExpenseId,
      qty,
      amount,
      unit,
    });
    await newDeliveryExpense.save();

    for (const detailId of detailIds) {
      await newDeliveryExpense.createDeliveryExpenseDetail({
        DeliveryDetailId: detailId,
      });
    }

    res.json({ data: newDeliveryExpense });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const delivery = await Delivery.findByPk(id, {
//       include: [
//         { model: DeliveryDetail, include: Product },
//         { model: Customer },
//         { model: DeliveryType },
//         {
//           model: Invoice,
//           include: [Customer, { model: Delivery, include: DeliveryDetail }],
//         },
//         { model: Purchase },
//       ],
//     });
//     if (!delivery) throw `Can't find delivery with id ${id}`;
//     res.json({ data: delivery });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await DeliveryExpense.findByPk(id, {
      include: [
        Expense,
        { model: DeliveryExpenseDetail, include: [DeliveryDetail] },
      ],
    });
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
