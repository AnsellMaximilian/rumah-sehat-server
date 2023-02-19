const router = require("express").Router();
const {
  sequelize: {
    models: {
      Invoice,
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Purchase,
      PurchaseDetail,
    },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Delivery, include: DeliveryDetail },
        { model: Customer },
      ],
    });
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { CustomerId, date, note, deliveries } = req.body;
    const newInvoice = Invoice.build({
      date,
      note,
      CustomerId,
    });
    await newInvoice.save();

    for (const deliveryData of deliveries) {
      const {
        mode,
        deliveryData: { date, cost, note, DeliveryTypeId },
        supplierDeliveryData: {
          cost: supplierCost,
          date: supplierDate,
          SupplierId,
        },
        deliveryDetails,
      } = deliveryData;

      const delivery = Delivery.build({
        date,
        cost,
        note,
        DeliveryTypeId,
        CustomerId,
      });

      await delivery.save();

      for (const deliveryDetail of deliveryDetails) {
        const { price, qty, ProductId, makePurchase } = deliveryDetail;

        await delivery.createDeliveryDetail({
          price,
          qty,
          ProductId,
        });
      }

      await newInvoice.addDelivery(delivery);

      // Purchases

      if (mode === "supplier") {
        const newPurchase = Purchase.build({
          date: supplierDate,
          cost: supplierCost,
          SupplierId,
        });

        await newPurchase.save();

        for (const purchaseDetail of deliveryDetails) {
          const { cost, qty, ProductId, makePurchase } = purchaseDetail;

          await newPurchase.createPurchaseDetail({
            price: cost,
            qty,
            ProductId,
          });
        }
      }
    }

    res.json({ message: "Success", data: newInvoice });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { date, cost, note, deliveryDetails, CustomerId, DeliveryTypeId } =
//       req.body;
//     const { id } = req.params;

//     const delivery = await Delivery.findByPk(id, {
//       include: [
//         { model: DeliveryDetail, include: Product },
//         { model: Customer },
//         { model: DeliveryType },
//       ],
//     });

//     await delivery.update(
//       { date, cost, note, deliveryDetails, CustomerId, DeliveryTypeId },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     // Delete delivery details
//     await DeliveryDetail.destroy({
//       where: {
//         DeliveryId: delivery.id,
//       },
//     });

//     // replace delivery details
//     for (const deliveryDetail of deliveryDetails) {
//       const { price, qty, ProductId } = deliveryDetail;

//       await delivery.createDeliveryDetail({
//         price,
//         qty,
//         ProductId,
//       });
//     }

//     res.json({ data: delivery });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const delivery = await Delivery.findByPk(id, {
//       include: [
//         { model: DeliveryDetail, include: Product },
//         { model: Customer },
//         { model: DeliveryType },
//       ],
//     });
//     if (!delivery) throw `Can't find delivery with id ${id}`;
//     res.json({ data: delivery });
//   } catch (error) {
//     next(error);
//   }
// });

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
