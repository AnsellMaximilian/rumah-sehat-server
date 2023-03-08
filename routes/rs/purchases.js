const router = require("express").Router();
const {
  sequelize: {
    models: { Purchase, PurchaseDetail, Product, Supplier, Delivery, Customer },
    query,
  },
  sequelize,
} = require("../../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

router.get("/", async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [PurchaseDetail, Supplier, Delivery],
    });
    res.json({ data: purchases });
  } catch (error) {
    next(error);
  }
});

router.get("/designated-sales", async (req, res, next) => {
  try {
    const sales = await PurchaseDetail.findAll({
      include: [Customer, Purchase, Product],
      where: {
        CustomerId: {
          [Op.not]: null,
        },
      },
    });
    res.json({ data: sales });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, cost, note, purchaseDetails, SupplierId } = req.body;
    const newPurchase = Purchase.build({
      date,
      cost,
      note,
      SupplierId,
    });
    await newPurchase.save();

    for (const purchaseDetail of purchaseDetails) {
      const { price, qty, ProductId, CustomerId } = purchaseDetail;

      await newPurchase.createPurchaseDetail({
        price,
        qty,
        ProductId,
        CustomerId,
      });
    }

    res.json({ message: "Success", data: newPurchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, cost, note, purchaseDetails, SupplierId } = req.body;
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id, {
      include: [
        { model: PurchaseDetail, include: Product },
        { model: Supplier },
      ],
    });

    await purchase.update(
      { date, cost, note, purchaseDetails, SupplierId },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete delivery details
    await PurchaseDetail.destroy({
      where: {
        PurchaseId: purchase.id,
      },
    });

    // replace delivery details
    for (const purchaseDetail of purchaseDetails) {
      const { price, qty, ProductId, CustomerId } = purchaseDetail;

      await purchase.createPurchaseDetail({
        price,
        qty,
        ProductId,
        CustomerId,
      });
    }

    res.json({ data: purchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/individual-invoice", async (req, res, next) => {
  try {
    const { startDate, endDate, supplierId } = req.query;

    const [details, metadata] = await sequelize.query(
      `
      SELECT 
          "Pr"."name", SUM("PD"."qty") AS "qty", 
          SUM("PD"."price" * "PD"."qty") AS "total",
          "PD"."price" AS "productPrice"
        FROM "Purchases" AS "P" 
      INNER JOIN "PurchaseDetails" AS "PD" ON "P"."id" = "PD"."PurchaseId" 
      INNER JOIN "Products" AS "Pr" ON "Pr"."id" = "PD"."ProductId"
        WHERE "P"."SupplierId"=${supplierId}
        AND "P"."date" >= '${startDate}'
        AND "P"."date" <= '${endDate}'
      GROUP BY "Pr"."name", "productPrice"
      ORDER BY "Pr"."name"
      `
    );

    const [cost, _] = await sequelize.query(
      `
      SELECT 
          SUM("P"."cost") AS "costTotal"
        from "Purchases" AS "P"
        WHERE "P"."SupplierId"=${supplierId}
        AND "P"."date" >= '${startDate}'
        AND "P"."date" <= '${endDate}'

      `
    );

    res.json({ data: { cost, details } });
  } catch (error) {
    next(error);
  }
});

router.get("/report-invoice", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const [purchaseTotals] = await sequelize.query(
      `
      SELECT 
          "S"."id" AS "supplierId",
          "S".name AS "supplierName",
          SUM("PD"."price" * "PD"."qty") AS "total"
        FROM "Purchases" AS "P" 
      INNER JOIN "PurchaseDetails" AS "PD" ON "P"."id" = "PD"."PurchaseId" 
      INNER JOIN "Suppliers" AS "S" ON "S"."id" = "P"."SupplierId"
        AND "P"."date" >= '${startDate}'
        AND "P"."date" <= '${endDate}'
      GROUP BY "S"."name", "supplierId"
      ORDER BY "S"."name"
      `
    );

    const [costTotals] = await sequelize.query(
      `
      SELECT 
          "S"."id" AS "supplierId",
          "S".name AS "supplierName",
          SUM("P"."cost") AS "costTotal"
        FROM "Purchases" AS "P" 
      INNER JOIN "Suppliers" AS "S" ON "S"."id" = "P"."SupplierId"
        AND "P"."date" >= '${startDate}'
        AND "P"."date" <= '${endDate}'
      GROUP BY "S"."name", "supplierId"
      ORDER BY "S"."name"
      `
    );
    const data = purchaseTotals.map((purchaseTotal) => {
      const deliveryCost = costTotals.find(
        (costTotal) => costTotal.supplierId === purchaseTotal.supplierId
      ).costTotal;
      const invoiceData = {
        ...purchaseTotal,
        delivery: deliveryCost,
        subtotal: purchaseTotal.total,
        total: parseInt(deliveryCost) + parseInt(purchaseTotal.total),
      };
      return invoiceData;
    });

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, {
      include: [
        { model: PurchaseDetail, include: [Product, Customer] },
        { model: Supplier },
      ],
    });
    if (!purchase) throw `Can't find purchase with id ${id}`;
    res.json({ data: purchase });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id);
    await purchase.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: purchase });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
