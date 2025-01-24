const router = require("express").Router();
const { Op } = require("sequelize");

const {
  sequelize: {
    models: { Region, Customer },
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

    const regions = await Region.findAll({
      where: whereClause,
      include: [Customer],
    });
    res.json({ data: regions });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const newRegion = Region.build({
      name,
    });
    await newRegion.save();

    res.json({ message: "Success", data: newRegion });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id, { include: [Customer] });
    if (!region) throw `Can't find item with id ${id}`;
    res.json({ data: region });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const region = await Region.findByPk(id);

    await region.update(
      { name },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: region });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id, {
      include: [Customer],
    });

    console.log({ region, length: region.Customers.length });

    if (region.Customers.length > 0)
      throw `Can't destroy region. ${region.Customers.length} in ${region.name} region.`;
    await region.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: region });
  } catch (error) {
    next(error);
  }
});

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
