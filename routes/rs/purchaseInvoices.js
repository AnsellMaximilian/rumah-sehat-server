const router = require("express").Router();
const {
  sequelize: {
    models: {
      Purchase,
      PurchaseDetail,
      Product,
      Supplier,
      Delivery,
      Customer,
      PurchaseInvoice,
    },
    query,
  },
  sequelize,
} = require("../../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const { SupplierId } = req.query;
    const whereClause = {};

    if (SupplierId) {
      whereClause.SupplierId = SupplierId;
    }
    const purchases = await PurchaseInvoice.findAll({
      include: [
        {
          model: Purchase,
          include: [PurchaseDetail],
        },
        { model: Supplier },
      ],
      where: whereClause,
    });
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { date, note, SupplierId, purchaseIds } = req.body;
    const newPurchaseInvoice = PurchaseInvoice.build({
      date,
      note,
      SupplierId,
      paid: false,
    });
    await newPurchaseInvoice.save();

    const purchases = await Purchase.findAll({
      where: {
        id: purchaseIds,
      },
    });

    await newPurchaseInvoice.addPurchases(purchases);

    res.json({ message: "Success", data: newPurchaseInvoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id/pay", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchaseInvoice = await PurchaseInvoice.findByPk(id, {
      include: [],
    });
    purchaseInvoice.update({
      paid: !purchaseInvoice.paid,
    });
    res.json({ data: purchaseInvoice });
  } catch (error) {
    next(error);
  }
});

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { date, cost, note, purchaseDetails, SupplierId } = req.body;
//     const { id } = req.params;

//     const purchase = await Purchase.findByPk(id, {
//       include: [
//         { model: PurchaseDetail, include: Product },
//         { model: Supplier },
//       ],
//     });

//     await purchase.update(
//       { date, cost, note, purchaseDetails, SupplierId },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     // Delete delivery details
//     await PurchaseDetail.destroy({
//       where: {
//         PurchaseId: purchase.id,
//       },
//     });

//     // replace delivery details
//     for (const purchaseDetail of purchaseDetails) {
//       const { price, qty, ProductId, CustomerId } = purchaseDetail;

//       await purchase.createPurchaseDetail({
//         price,
//         qty,
//         ProductId,
//         CustomerId,
//       });
//     }

//     res.json({ data: purchase });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const purchase = await Purchase.findByPk(id, {
//       include: [
//         { model: PurchaseDetail, include: [Product, Customer] },
//         { model: Supplier },
//         { model: Delivery },
//       ],
//     });
//     if (!purchase) throw `Can't find purchase with id ${id}`;
//     res.json({ data: purchase });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const purchase = await Purchase.findByPk(id);
//     await purchase.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.json({ data: purchase });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
