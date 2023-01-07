const router = require("express").Router();
const {
  sequelize: {
    models: {
      DrInvoice,
      DrIdDelivery,
      DrSgDelivery,
      DrIdDeliveryDetail,
      DrSgDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrIdItem,
      DrSgItem,
    },
  },
} = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const invoices = await DrInvoice.findAll({
      include: [
        {
          model: DrIdDelivery,
          include: [DrIdDeliveryDetail, Customer, DrDiscountModel],
        },
        {
          model: DrSgDelivery,
          include: [DrSgDeliveryDetail, Customer, DrDiscountModel],
        },
      ],
    });
    res.json({ data: invoices });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, note } = req.body;

    const newInvoice = DrDiscountModel.build({
      date,
      note,
    });
    await newInvoice.save();

    res.json({ message: "Success", data: newInvoice });
  } catch (error) {
    res.json({ error });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const model = await DrDiscountModel.findByPk(id);
//     if (!model) throw `Can't find item with id ${id}`;
//     res.json({ data: model });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const model = await DrDiscountModel.findByPk(id, { include: DrIdDelivery });

//     if (model.DrIdDeliveries.length === 0) {
//       await model.destroy({
//         where: {
//           id: id,
//         },
//       });
//       res.json({ data: model });
//     } else {
//       res.json({ error: "Failed to delete. This model has deliveries." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// });

module.exports = router;
