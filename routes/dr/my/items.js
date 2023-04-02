const router = require("express").Router();
const {
  sequelize: {
    models: { DrMyItem, DrMyDeliveryDetail },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const items = await DrMyItem.findAll();
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, priceRM, points, deliveryCost } = req.body;

    const newItem = DrMyItem.build({ name, priceRM, points, deliveryCost });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrMyItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, priceRM, points, deliveryCost } = req.body;
    const { id } = req.params;

    const item = await DrMyItem.findByPk(id);

    await item.update(
      { name, priceRM, points, deliveryCost },
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
    const item = await DrMyItem.findByPk(id, { include: DrMyDeliveryDetail });
    if (item.DrMyDeliveryDetails.length > 0)
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
