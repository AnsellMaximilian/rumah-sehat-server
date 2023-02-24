const router = require("express").Router();
const {
  sequelize: {
    models: { Region },
  },
} = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const regions = await Region.findAll();
    res.json({ data: regions });
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const { fullName, address, phone, rsMember, receiveDrDiscount } = req.body;

//     const newCustomer = Customer.build({
//       fullName,
//       address,
//       phone,
//       rsMember,
//       receiveDrDiscount,
//     });
//     await newCustomer.save();

//     res.json({ message: "Success", data: newCustomer });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const customer = await Customer.findByPk(id);
//     if (!customer) throw `Can't find item with id ${id}`;
//     res.json({ data: customer });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// router.patch("/:id", async (req, res) => {
//   try {
//     const { fullName, address, phone, rsMember, receiveDrDiscount } = req.body;
//     const { id } = req.params;

//     const customer = await Customer.findByPk(id);

//     await customer.update(
//       { fullName, address, phone, rsMember, receiveDrDiscount },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     res.json({ data: customer });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const customer = await Customer.findByPk(id);
//     await customer.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.json({ data: customer });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// // DR SECRET
// router.get("/:id/dr/id/deliveries", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deliveries = await DrIdDelivery.findAll({
//       where: { CustomerId: id },

//       include: [
//         { model: DrIdDeliveryDetail, include: DrIdItem },
//         { model: Customer },
//         { model: DrDiscountModel },
//       ],
//     });
//     res.json({ data: deliveries });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// router.get("/:id/dr/sg/deliveries", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deliveries = await DrSgDelivery.findAll({
//       where: { CustomerId: id },

//       include: [
//         { model: DrSgDeliveryDetail, include: DrSgItem },
//         { model: Customer },
//         { model: DrDiscountModel },
//       ],
//     });
//     res.json({ data: deliveries });
//   } catch (error) {
//     res.json({ error });
//   }
// });

module.exports = router;
