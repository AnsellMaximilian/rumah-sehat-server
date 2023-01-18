const router = require("express").Router();
const {
  sequelize: {
    models: { ProductCategory, Product },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll();
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = ProductCategory.build({ name });
    await newCategory.save();

    res.json({ message: "Success", data: newCategory });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) throw `Can't find category with id ${id}`;
    res.json({ data: category });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const supplier = await ProductCategory.findByPk(id);

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
    const category = await ProductCategory.findByPk(id, { include: Product });
    if (category.Products.length > 0)
      throw "Cannot delete. Product category has associated products.";
    await category.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
