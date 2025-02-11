const router = require("express").Router();
const { Op } = require("sequelize");
const path = require("path");
const moment = require("moment");
const {
  sequelize: {
    models: {
      Product,
      ProductCategory,
      Supplier,
      PurchaseDetail,
      DeliveryDetail,
      Purchase,
      Delivery,
      Draw,
      Customer,
      StockAdjustment,
      StockMatch,
    },
  },
  sequelize,
} = require("../../models/index");
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");
router.get("/", async (req, res, next) => {
  try {
    const { name, SupplierId, ProductCategoryId, activeStatus } = req.query;
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

    if (!activeStatus) {
      whereClause.isActive = true;
    } else if (activeStatus !== "all")
      whereClause.isActive = activeStatus === "active";

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

router.get("/print", async (req, res, next) => {
  try {
    const { SupplierId, exclude, includeCost, includeInactive } = req.query;

    const whereClause = {
      isActive: true,
    };
    let printTitle = "Product List";
    let supplier;
    if (SupplierId) {
      supplier = await Supplier.findByPk(SupplierId);
      whereClause.SupplierId = SupplierId;
      printTitle = `${supplier.name} Product List`;
    }

    if (includeInactive) whereClause.isActive = undefined;

    const products = await Product.findAll({
      include: [ProductCategory, Supplier],
      order: [["name", "ASC"]],
      where: whereClause,
      attributes: {
        exclude: exclude ? exclude : [],
      },
    });

    const data = {
      products: products.map((product) => product.toJSON()),
      supplier: supplier ? supplier.toJSON() : null,
      includeCost: !!includeCost,
      datePrinted: moment().format("DD MMMM YYYY"),
    };

    const pdfStream = await createPDFStream(
      path.join(__dirname, "..", "..", "templates", "product-list.hbs"),
      data
    );

    pdfStream.pipe(res);

    // const html = generateHTML(
    //   path.join(__dirname, "..", "..", "templates", "product-list.hbs"),

    //   data
    // );
    // res.end(html);
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
      restockNumber,
      cost,
      overallCost,
      SupplierId,
      ProductCategoryId,
      unit,
      keepStockSince,
    } = req.body;

    const newProduct = Product.build({
      name,
      price,
      resellerPrice,
      restockNumber,
      cost,
      overallCost,
      SupplierId,
      unit,
      ProductCategoryId,
      keepStockSince,
    });
    await newProduct.save();

    res.json({ message: "Success", data: newProduct });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/draw", async (req, res, next) => {
  try {
    const { amount, date, description } = req.body;

    const { id } = req.params;

    const newDraw = Draw.build({
      amount,
      date,
      ProductId: id,
      description,
    });
    await newDraw.save();

    res.json({ message: "Success", data: newDraw });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/adjust-stock", async (req, res, next) => {
  try {
    const { amount, date, description } = req.body;

    const { id } = req.params;

    const newAdj = StockAdjustment.build({
      amount,
      date,
      ProductId: id,
      description,
    });
    await newAdj.save();

    res.json({ message: "Success", data: newAdj });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/match-stock", async (req, res, next) => {
  try {
    const { qty, date, description } = req.body;

    const { id } = req.params;

    const newMatch = StockMatch.build({
      qty,
      date,
      ProductId: id,
      description,
    });
    await newMatch.save();

    res.json({ message: "Success", data: newMatch });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/stock", async (req, res, next) => {
  try {
    const { id } = req.params;
    let stock = 0;
    const product = await Product.findByPk(id, {
      include: [PurchaseDetail, DeliveryDetail],
    });
    if (!product) throw `Can't find product with id ${id}`;
    if (product.keepStockSince !== null) {
      const incoming = await Purchase.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
        },
        include: [
          {
            model: PurchaseDetail,
            where: {
              ProductId: product.id,
            },
          },
        ],
      });
      const outgoing = await Delivery.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
        },
        include: [
          {
            model: DeliveryDetail,
            where: {
              ProductId: product.id,
            },
          },
        ],
      });

      const draws = await Draw.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
          ProductId: product.id,
        },
      });

      const adjustments = await StockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
          ProductId: product.id,
        },
      });
      const incomingNumber = incoming.reduce(
        (sum, inc) =>
          sum +
          inc.PurchaseDetails.reduce((sum, pd) => sum + parseFloat(pd.qty), 0),
        0
      );

      const outgoingNumber = outgoing.reduce(
        (sum, out) =>
          sum +
          out.DeliveryDetails.reduce((sum, dd) => sum + parseFloat(dd.qty), 0),
        0
      );

      const drawNumber = draws.reduce(
        (sum, draw) => sum + parseFloat(draw.amount),
        0
      );

      const adjustmentNumber = adjustments.reduce(
        (sum, adj) => sum + parseFloat(adj.amount),
        0
      );

      stock = incomingNumber - outgoingNumber - drawNumber + adjustmentNumber;
    }

    res.json({ data: stock });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/stock-matches", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;

    if (limit && isNaN(limit)) {
      throw `Limit must be a number.`;
    }

    const matches = await StockMatch.findAll({
      where: {
        ProductId: id,
      },
      order: [
        ["date", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: limit ? parseInt(limit, 10) : undefined,
    });

    res.json({ data: matches });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/history", async (req, res, next) => {
  try {
    const { id } = req.params;
    let stock = 0;
    const product = await Product.findByPk(id, {
      // include: [PurchaseDetail, DeliveryDetail, Draw],
    });
    if (!product) throw `Can't find product with id ${id}`;
    if (product.keepStockSince !== null) {
      const purchaseDetails = await PurchaseDetail.findAll({
        where: {
          ProductId: product.id,
        },
        include: [
          {
            model: Purchase,
            where: {
              date: {
                [Op.gte]: product.keepStockSince,
              },
            },
          },
        ],
      });
      const deliveryDetails = await DeliveryDetail.findAll({
        where: {
          ProductId: product.id,
        },
        include: [
          {
            model: Delivery,
            include: Customer,

            where: {
              date: {
                [Op.gte]: product.keepStockSince,
              },
            },
          },
        ],
      });

      const draws = await Draw.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
          ProductId: product.id,
        },
      });

      const adjustments = await StockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: product.keepStockSince,
          },
          ProductId: product.id,
        },
      });
      return res.json({
        data: { purchaseDetails, deliveryDetails, draws, adjustments },
      });
    }

    res.json({ data: 0 });
  } catch (error) {
    next(error);
  }
});

router.get("/stock-report", async (req, res, next) => {
  try {
    const [stock] = await sequelize.query(
      `
      SELECT 
        "p"."name",
        "p"."id",
        "p"."restockNumber",
        COALESCE(SUM("pd"."amount"), 0) as "totalIn",
        COALESCE(SUM("dd"."amount"), 0) as "totalOut",
        COALESCE(SUM("dr"."amount"), 0) as "totalDrawn",
        COALESCE(SUM("sa"."amount"), 0) as "totalAdjusted",
        (COALESCE(SUM("pd"."amount"), 0) - COALESCE(SUM("dd"."amount"), 0) - COALESCE(SUM("dr"."amount"), 0) + COALESCE(SUM("sa"."amount"), 0)) as "stock",
        "pm"."latestStockMatchDate",
        "pm"."latestStockMatchQty"
      FROM "Products" as "p"
      LEFT JOIN
        (
          SELECT 
            "Products"."id" as "productId", sum("PurchaseDetails"."qty") as "amount"
          FROM "PurchaseDetails"
          inner join "Purchases" on "Purchases"."id" = "PurchaseDetails"."PurchaseId"
          inner join "Products" on "PurchaseDetails"."ProductId" = "Products"."id"
          Where "Products"."keepStockSince" is not null and "Purchases"."date" >= "Products"."keepStockSince"
          group by "productId"
        ) as "pd"
        ON "pd"."productId" = "p"."id"
      LEFT JOIN
        (
          SELECT 
            "Products"."id" as "productId", sum("DeliveryDetails"."qty") as "amount"
          FROM "DeliveryDetails"
          inner join "Deliveries" on "Deliveries"."id" = "DeliveryDetails"."DeliveryId"
          inner join "Products" on "DeliveryDetails"."ProductId" = "Products"."id"
          Where "Products"."keepStockSince" is not null and "Deliveries"."date" >= "Products"."keepStockSince"
          group by "productId"
        ) as "dd"
        ON "dd"."productId" = "p"."id"
      LEFT JOIN
        (
          SELECT 
            "Products"."id" as "productId", sum("Draws"."amount") as "amount"
          FROM "Draws"
          inner join "Products" on "Draws"."ProductId" = "Products"."id"
          Where "Products"."keepStockSince" is not null and "Draws"."date" >= "Products"."keepStockSince"
          group by "productId"
        ) as "dr"
        ON "dr"."productId" = "p"."id"
      LEFT JOIN
        (
          SELECT 
            "Products"."id" as "productId", sum("StockAdjustments"."amount") as "amount"
          FROM "StockAdjustments"
          inner join "Products" on "StockAdjustments"."ProductId" = "Products"."id"
          Where "Products"."keepStockSince" is not null and "StockAdjustments"."date" >= "Products"."keepStockSince"
          group by "productId"
        ) as "sa"
        ON "sa"."productId" = "p"."id"
      LEFT JOIN
        (
          SELECT DISTINCT ON ("pm1"."ProductId") 
              "pm1"."ProductId" AS "productId",
              "pm1"."date" AS "latestStockMatchDate",
              "pm1"."qty" AS "latestStockMatchQty"
          FROM "StockMatches" AS "pm1"
          ORDER BY "pm1"."ProductId", "pm1"."date" DESC, "pm1"."createdAt" DESC
        ) AS "pm"
        ON "pm"."productId" = "p"."id"
      WHERE "p"."keepStockSince" is not null
      GROUP BY
        "p"."name", "p"."id", "p"."restockNumber",
        "pm"."latestStockMatchDate", "pm"."latestStockMatchQty"
      ORDER BY
        "p"."name" ASC
      `
    );

    res.json({ data: stock });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { excludePurchases, excludeDeliveries } = req.query;

    const include = [Supplier, ProductCategory];
    if (!excludePurchases) include.push(PurchaseDetail);
    if (!excludeDeliveries) include.push(DeliveryDetail);

    const product = await Product.findByPk(id, {
      include,
    });
    if (!product) throw `Can't find product with id ${id}`;
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.patch("/configure-overall-cost", async (req, res, next) => {
  try {
    const { productIds, splitCost } = req.body;

    for (const id of productIds) {
      const product = await Product.findByPk(id);

      await product.update({
        overallCost: product.cost + splitCost,
      });
    }

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/cycle-active-status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    product.update({
      isActive: !product.isActive,
    });
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
      restockNumber,
      cost,
      overallCost,
      SupplierId,
      ProductCategoryId,
      unit,

      keepStockSince,
    } = req.body;
    const { id } = req.params;

    const product = await Product.findByPk(id);

    await product.update(
      {
        name,
        price,
        resellerPrice,
        restockNumber,
        cost,
        overallCost,
        SupplierId,
        ProductCategoryId,
        unit,
        keepStockSince,
      },
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
