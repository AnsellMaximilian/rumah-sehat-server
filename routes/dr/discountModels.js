const router = require("express").Router();
const {
  sequelize: {
    models: { DrDiscountModel },
  },
} = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const models = await DrDiscountModel.findAll();
    res.json({ data: models });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { description, subtractor, base, percentage } = req.body;

    const newModel = DrDiscountModel.build({
      description,
      subtractor,
      base,
      percentage,
    });
    await newModel.save();

    res.json({ message: "Success", data: newModel });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = await DrDiscountModel.findByPk(id);
    if (!model) throw `Can't find item with id ${id}`;
    res.json({ data: model });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
