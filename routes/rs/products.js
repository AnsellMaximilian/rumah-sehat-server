const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      Product,
      ProductCategory,
      Supplier,
      PurchaseDetail,
      DeliveryDetail,
    },
  },
} = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { name, SupplierId, ProductCategoryId } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (SupplierId) {
      whereClause.SupplierId = SupplierId;
    }

    if (ProductCategoryId) {
      whereClause.ProductCategoryId = ProductCategoryId;
    }

    const products = await Product.findAll({
      include: [ProductCategory, Supplier],
      order: [["name", "ASC"]],
      where: whereClause,
    });
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      price,
      resellerPrice,
      cost,
      SupplierId,
      ProductCategoryId,
      unit,
    } = req.body;

    const newProduct = Product.build({
      name,
      price,
      resellerPrice,
      cost,
      SupplierId,
      unit,
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
    const product = await Product.findByPk(id, {
      include: [PurchaseDetail, DeliveryDetail],
    });
    if (!product) throw `Can't find product with id ${id}`;
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const {
      name,
      price,
      resellerPrice,
      cost,
      SupplierId,
      ProductCategoryId,
      unit,
    } = req.body;
    const { id } = req.params;

    const product = await Product.findByPk(id);

    await product.update(
      { name, price, resellerPrice, cost, SupplierId, ProductCategoryId, unit },
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
