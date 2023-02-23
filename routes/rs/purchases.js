const router = require("express").Router();
const {
  sequelize: {
    models: { Purchase, PurchaseDetail, Product, Supplier },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [PurchaseDetail, Supplier],
    });
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, cost, note, purchaseDetails, SupplierId } = req.body;
    const newPurchase = Purchase.build({
      date,
      cost,
      note,
      SupplierId,
    });
    await newPurchase.save();

    for (const purchaseDetail of purchaseDetails) {
      const { price, qty, ProductId } = purchaseDetail;

      await newPurchase.createPurchaseDetail({
        price,
        qty,
        ProductId,
      });
    }

    res.json({ message: "Success", data: newPurchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, cost, note, purchaseDetails, SupplierId } = req.body;
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id, {
      include: [
        { model: PurchaseDetail, include: Product },
        { model: Supplier },
      ],
    });

    await purchase.update(
      { date, cost, note, purchaseDetails, SupplierId },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete delivery details
    await PurchaseDetail.destroy({
      where: {
        PurchaseId: purchase.id,
      },
    });

    // replace delivery details
    for (const purchaseDetail of purchaseDetails) {
      const { price, qty, ProductId } = purchaseDetail;

      await purchase.createPurchaseDetail({
        price,
        qty,
        ProductId,
      });
    }

    res.json({ data: purchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, {
      include: [
        { model: PurchaseDetail, include: Product },
        { model: Supplier },
      ],
    });
    if (!purchase) throw `Can't find purchase with id ${id}`;
    res.json({ data: purchase });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const delivery = await Delivery.findByPk(id, {
//       include: DeliveryDetail,
//     });
//     if (delivery.DeliveryDetails.length > 0)
//       throw "Can't delete: This delivery is not empty.";
//     await delivery.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.json({ data: delivery });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
