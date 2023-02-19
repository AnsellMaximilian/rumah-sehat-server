const router = require("express").Router();
const {
  sequelize: {
    models: { Purchase, PurchaseDetail, Product },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [PurchaseDetail],
    });
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const { date, cost, note, deliveryDetails, CustomerId, DeliveryTypeId } =
//       req.body;
//     const newDelivery = Delivery.build({
//       date,
//       cost,
//       note,
//       CustomerId,
//       DeliveryTypeId,
//     });
//     await newDelivery.save();

//     for (const deliveryDetail of deliveryDetails) {
//       const { price, qty, ProductId } = deliveryDetail;
//       console.log({ price, qty, ProductId });

//       await newDelivery.createDeliveryDetail({
//         price,
//         qty,
//         ProductId,
//       });
//     }

//     res.json({ message: "Success", data: newDelivery });
//   } catch (error) {
//     next(error);
//   }
// });

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
