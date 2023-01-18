const router = require("express").Router();
const {
  sequelize: {
    models: { DeliveryType, Delivery },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const deliveryTypes = await DeliveryType.findAll();
    res.json({ data: deliveryTypes });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const newType = DeliveryType.build({ name });
    await newType.save();

    res.json({ message: "Success", data: newType });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deliveryTYpe = await DeliveryType.findByPk(id);
    if (!deliveryTYpe) throw `Can't find type with id ${id}`;
    res.json({ data: deliveryTYpe });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const type = await DeliveryType.findByPk(id);

    await type.update(
      { name },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: type });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deliveryTYpe = await DeliveryType.findByPk(id, { include: Delivery });
    if (deliveryTYpe.Deliveries.length > 0)
      throw "Cannot delete. Type has associated deliveries.";
    await deliveryTYpe.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: deliveryTYpe });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
