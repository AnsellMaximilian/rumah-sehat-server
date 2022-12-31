const router = require("express").Router();
const {
  sequelize: {
    models: { DrIdItem },
  },
} = require("../../../models/index");

router.get("/", async (req, res) => {
  try {
    const items = await DrIdItem.findAll();
    res.json({ data: items });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, priceRP, points } = req.body;

    const newItem = DrIdItem.build({ name, priceRP, points });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await DrIdItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
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
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await DrIdItem.findByPk(id);
    await item.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: item });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
