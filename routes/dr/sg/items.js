const router = require("express").Router();
const {
  sequelize: {
    models: { DrSgItem, DrSgDeliveryDetail },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const items = await DrSgItem.findAll();
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, priceSGD, points, deliveryCost, weight } = req.body;

    const newItem = DrSgItem.build({
      name,
      priceSGD,
      points,
      deliveryCost,
      weight,
    });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrSgItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, priceSGD, points, deliveryCost, weight } = req.body;
    const { id } = req.params;

    const item = await DrSgItem.findByPk(id);

    await item.update(
      { name, priceSGD, points, deliveryCost, weight },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrSgItem.findByPk(id, { include: DrSgDeliveryDetail });
    if (item.DrSgDeliveryDetails.length > 0)
      throw "Cannot delete. Item has associated delivery details.";

    await item.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
