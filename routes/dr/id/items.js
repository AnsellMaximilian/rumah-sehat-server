const router = require("express").Router();
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: { DrIdItem, DrIdDeliveryDetail },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const items = await DrIdItem.findAll();
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, priceRP, points } = req.body;

    const newItem = DrIdItem.build({ name, priceRP, points });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrIdItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, priceRP, points } = req.body;
    const { id } = req.params;

    const item = await DrIdItem.findByPk(id);

    await item.update(
      { name, priceRP, points },
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
    const item = await DrIdItem.findByPk(id, { include: DrIdDeliveryDetail });
    if (item.DrIdDeliveryDetails.length > 0)
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
