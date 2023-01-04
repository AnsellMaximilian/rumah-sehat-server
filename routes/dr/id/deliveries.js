const router = require("express").Router();
const {
  sequelize: {
    models: { DrIdDelivery },
  },
} = require("../../../models/index");

router.get("/", async (req, res) => {
  try {
    const deliveries = await DrIdDelivery.findAll();
    res.json({ data: deliveries });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, priceRP, points } = req.body;

    const newDelivery = DrIdDelivery.build({ name, priceRP, points });
    await newDelivery.save();

    res.json({ message: "Success", data: newDelivery });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DrIdDelivery.findByPk(id);
    if (!delivery) throw `Can't find delivery with id ${id}`;
    res.json({ data: delivery });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { name, priceRP, points } = req.body;
    const { id } = req.params;

    const delivery = await DrIdDelivery.findByPk(id);

    await delivery.update(
      { name, priceRP, points },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: delivery });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DrIdDelivery.findByPk(id);
    await delivery.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: delivery });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
