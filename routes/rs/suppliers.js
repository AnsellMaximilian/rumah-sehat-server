const router = require("express").Router();
const {
  sequelize: {
    models: { Supplier, Product },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json({ data: suppliers });
  } catch (error) {
    next(error);
  }
});

router.get("/active", async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll({ include: Product });
    res.json({
      data: suppliers.filter((supplier) => supplier.Products.length > 0),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const newItem = Supplier.build({ name });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw `Can't find supplier with id ${id}`;
    res.json({ data: supplier });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id);

    await supplier.update(
      { name },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: supplier });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id, { include: Product });
    if (supplier.Products.length > 0)
      throw "Cannot delete. Supplier has associated products.";
    await supplier.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: supplier });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
