const router = require("express").Router();
const {
  sequelize: {
    models: { Product, ProductCategory, Supplier },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [ProductCategory, Supplier],
    });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, price, resellerPrice, cost, SupplierId, ProductCategoryId } =
      req.body;

    const newProduct = Product.build({
      name,
      price,
      resellerPrice,
      cost,
      SupplierId,
      ProductCategoryId,
    });
    await newProduct.save();

    res.json({ message: "Success", data: newProduct });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw `Can't find product with id ${id}`;
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, price, resellerPrice, cost, SupplierId, ProductCategoryId } =
      req.body;
    const { id } = req.params;

    const product = await Product.findByPk(id);

    await product.update(
      { name, price, resellerPrice, cost, SupplierId, ProductCategoryId },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    // if (product.Products.length > 0) !!!
    //   throw "Cannot delete. Supplier has associated products.";
    await product.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
