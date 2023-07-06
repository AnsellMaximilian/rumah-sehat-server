const router = require("express").Router();
const {
  sequelize: {
    models: {
      Purchase,
      PurchaseDetail,
      Product,
      Supplier,
      Delivery,
      Customer,
      PurchaseInvoice,
    },
    query,
  },
  sequelize,
} = require("../../models/index");

const { Op, QueryTypes } = require("sequelize");
const moment = require("moment");

const getPurchaseTotals = async (startDate, endDate, unpaidFilter) => {
  const [purchaseTotals] = await sequelize.query(
    `
    SELECT 
        "S"."id" AS "supplierId",
        "S".name AS "supplierName",
        SUM("PD"."price" * "PD"."qty") AS "total"
      FROM "Purchases" AS "P" 
    INNER JOIN "PurchaseDetails" AS "PD" ON "P"."id" = "PD"."PurchaseId" 
    INNER JOIN "Suppliers" AS "S" ON "S"."id" = "P"."SupplierId"
    ${
      unpaidFilter
        ? `WHERE "P"."paid" = FALSE`
        : ` AND "P"."date" >= '${startDate}'
      AND "P"."date" <= '${endDate}'`
    }
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
    ${
      unpaidFilter
        ? `WHERE "P"."paid" = FALSE`
        : ` AND "P"."date" >= '${startDate}'
      AND "P"."date" <= '${endDate}'`
    }
    GROUP BY "S"."name", "supplierId"
    ORDER BY "S"."name"
    `
  );

  const [adjustments] = await sequelize.query(
    `
    SELECT 
        "S"."id" AS "supplierId",
        "S".name AS "supplierName",
        SUM("PA"."amount") AS "adjustmentTotal"
      FROM "PurchaseAdjustments" AS "PA" 
    INNER JOIN "Suppliers" AS "S" ON "S"."id" = "PA"."SupplierId"
      AND "PA"."date" >= '${startDate}'
      AND "PA"."date" <= '${endDate}'
    GROUP BY "S"."name", "supplierId"
    ORDER BY "S"."name"
    `
  );

  return { purchaseTotals, adjustments, costTotals };
};

router.get("/", async (req, res, next) => {
  try {
    const { SupplierId, invoiced } = req.query;
    const whereClause = {};

    if (SupplierId) {
      whereClause.SupplierId = SupplierId;
    }

    if (invoiced === "true") {
      whereClause.PurchaeInvoiceId = {
        [Op.not]: null,
      };
    } else if (invoiced === "false") {
      whereClause.PurchaseInvoiceId = null;
    }
    const purchases = await Purchase.findAll({
      include: [PurchaseDetail, Supplier, Delivery, PurchaseInvoice],
      where: whereClause,
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

router.post("/:id/unlink", async (req, res, next) => {
  try {
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id);
    if (purchase.PurchaseInvoiceId !== null) {
      await purchase.update({ PurchaseInvoiceId: null });
    }

    res.json({ message: "Success", data: purchase });
  } catch (error) {
    next(error);
  }
});

router.post("/pay", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;

    const updatedTotal = await Purchase.update(
      {
        paid: true,
      },
      {
        where: {
          date: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      }
    );
    console.log(updatedTotal);
    res.json({ data: updatedTotal });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      date,
      cost,
      note,
      purchaseDetails,
      SupplierId,
      makePurchaseInvoice,
    } = req.body;
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

    if (makePurchaseInvoice) {
      const newPurchaseInvoice = PurchaseInvoice.build({
        date,
        note,
        SupplierId,
        paid: false,
      });
      await newPurchaseInvoice.save();
      await newPurchaseInvoice.addPurchase(newPurchase);
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
    const { startDate, endDate, supplierId, unpaid } = req.query;

    const unpaidFilter = unpaid === "yes";

    const [details] = await sequelize.query(
      `
      SELECT 
          "Pr"."name", SUM("PD"."qty") AS "qty", 
          SUM("PD"."price" * "PD"."qty") AS "total",
          "PD"."price" AS "productPrice"
        FROM "Purchases" AS "P" 
      INNER JOIN "PurchaseDetails" AS "PD" ON "P"."id" = "PD"."PurchaseId" 
      INNER JOIN "Products" AS "Pr" ON "Pr"."id" = "PD"."ProductId"
        WHERE "P"."SupplierId"=${supplierId}
        ${
          unpaidFilter
            ? `AND "P"."paid" = FALSE`
            : `
            AND "P"."date" >= '${startDate}'
            AND "P"."date" <= '${endDate}'
            `
        }
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

    const [adjustment] = await sequelize.query(
      `
      SELECT 
          SUM("PA"."amount") AS "adjustmentTotal"

        FROM "PurchaseAdjustments" AS "PA" 
      INNER JOIN "Suppliers" AS "S" ON "S"."id" = "PA"."SupplierId"
        WHERE "PA"."SupplierId"=${supplierId}
        AND "PA"."date" >= '${startDate}'
        AND "PA"."date" <= '${endDate}'

      `
    );

    res.json({ data: { cost, details, adjustment } });
  } catch (error) {
    next(error);
  }
});

router.get("/report-invoice", async (req, res, next) => {
  try {
    const { startDate, endDate, unpaid } = req.query;

    const unpaidFilter = unpaid === "yes";

    const { purchaseTotals, costTotals, adjustments } = await getPurchaseTotals(
      startDate,
      endDate,
      unpaidFilter
    );

    const data = purchaseTotals.map((purchaseTotal) => {
      const deliveryCost = costTotals.find(
        (costTotal) => costTotal.supplierId === purchaseTotal.supplierId
      ).costTotal;
      const adjustmentTotal =
        adjustments.find(
          (adjustment) => adjustment.supplierId === purchaseTotal.supplierId
        )?.adjustmentTotal || 0;
      const invoiceData = {
        ...purchaseTotal,
        delivery: deliveryCost,
        adjustmentTotal,
        subtotal: purchaseTotal.total,
        total:
          parseInt(deliveryCost) +
          parseInt(purchaseTotal.total) +
          parseInt(adjustmentTotal),
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
        { model: Delivery },
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
