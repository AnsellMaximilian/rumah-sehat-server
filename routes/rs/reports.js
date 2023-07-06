const router = require("express").Router();
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");
const path = require("path");
const {
  sequelize,
  sequelize: {
    models: {
      Product,
      ProductCategory,
      Supplier,
      DeliveryDetail,
      Delivery,
      Purchase,
      PurchaseDetail,
      Expenditure,
      ExpenseDetail,
      Expense,
    },
  },
} = require("../../models/index");
const moment = require("moment");
const { Op } = require("sequelize");

const getProfits = async (startDate, endDate) => {
  const [totals] = await sequelize.query(
    `
      SELECT
              SUM("DD"."price" * "DD"."qty") as "totalPrice",
              SUM("DD"."qty") as "totalQty",
              SUM("DD"."cost" * "DD"."qty") as "totalCost",
              SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit"
          FROM "Invoices" as "I"
      INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
      INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
          AND "D"."date" >= '${startDate}'
          AND "D"."date" <= '${endDate}'
      `
  );

  const [profits] = await sequelize.query(
    `
      SELECT
              "P"."name" as "product",
              "DD"."price",
              "P"."cost",
              "P"."SupplierId" as "supplierId",
              "P"."id" as "productId",
              "S"."name",
              SUM("DD"."price" * "DD"."qty") as "totalPrice",
              SUM("DD"."qty") as "totalQty",
              SUM("DD"."cost" * "DD"."qty") as "totalCost",
              SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit"
          FROM "Invoices" as "I"
      INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
      INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
      INNER JOIN "Products" as "P" ON "DD"."ProductId" = "P"."id"
      INNER JOIN "Suppliers" AS "S" ON "P"."SupplierId" = "S"."id"
          AND "D"."date" >= '${startDate}'
          AND "D"."date" <= '${endDate}'
      GROUP BY "product", "DD"."price", "P"."cost", "supplierId", "S"."name", "productId"
      ORDER BY "product"
      `
  );

  const [suppliers] = await sequelize.query(
    `
        SELECT
              "P"."SupplierId" as "supplierId",
              "S"."name",
              SUM("DD"."price" * "DD"."qty") as "totalPrice",
              SUM("DD"."qty") as "totalQty",
              SUM("DD"."cost" * "DD"."qty") as "totalCost",
              SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit"
            FROM "Invoices" as "I"
        INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
        INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
        INNER JOIN "Products" as "P" ON "DD"."ProductId" = "P"."id"
        INNER JOIN "Suppliers" AS "S" ON "P"."SupplierId" = "S"."id"
            AND "D"."date" >= '${startDate}'
            AND "D"."date" <= '${endDate}'
        GROUP BY "S"."name", "supplierId"
        `
  );

  console.log({ profits, suppliers, totals });

  return { profits, suppliers, totals };
};

const getPurchaseTotals = async (startDate, endDate) => {
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

  const [products] = await sequelize.query(
    `
      SELECT
              "P"."name" as "product",
              "PD"."price",
              "P"."SupplierId" as "supplierId",
              "P"."id" as "productId",
              "S"."name",
              SUM("PD"."price" * "PD"."qty") as "totalPrice",
              SUM("PD"."qty") as "totalQty"
      FROM "Purchases" as "Pu"
      INNER JOIN "PurchaseDetails" as "PD" on "Pu"."id" = "PD"."PurchaseId"
      INNER JOIN "Products" as "P" ON "PD"."ProductId" = "P"."id"
      INNER JOIN "Suppliers" AS "S" ON "P"."SupplierId" = "S"."id"
          AND "Pu"."date" >= '${startDate}'
          AND "Pu"."date" <= '${endDate}'
      GROUP BY "product", "PD"."price", "supplierId", "S"."name", "productId"
      ORDER BY "product"
      `
  );
  const [purchaseAdjustments] = await sequelize.query(
    `
      SELECT
              "PA"."id" as "adjustmentId",
              "PA"."SupplierId" as "supplierId",
              "PA"."amount",
              "PA"."description"
      FROM "PurchaseAdjustments" as "PA"
      INNER JOIN "Suppliers" AS "S" ON "PA"."SupplierId" = "S"."id"
          AND "PA"."date" >= '${startDate}'
          AND "PA"."date" <= '${endDate}'
      `
  );

  const [purchaseCosts] = await sequelize.query(
    `
      SELECT
              "S"."id" as "supplierId",
              SUM("Pu"."cost") as "purchaseCost",
              COUNT("Pu"."cost") as "costQty"
      FROM "Purchases" as "Pu"
      INNER JOIN "Suppliers" AS "S" ON "Pu"."SupplierId" = "S"."id"
          AND "Pu"."date" >= '${startDate}'
          AND "Pu"."date" <= '${endDate}'
      GROUP BY "supplierId"
      `
  );

  const [costTotals] = await sequelize.query(
    `
    SELECT 
        "S"."id" AS "supplierId",
        "S".name AS "supplierName",
        SUM("P"."cost") AS "costTotal",
        COUNT("P"."cost") AS "totalQty"
      FROM "Purchases" AS "P" 
    INNER JOIN "Suppliers" AS "S" ON "S"."id" = "P"."SupplierId"
      AND "P"."date" >= '${startDate}'
      AND "P"."date" <= '${endDate}'
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

  return {
    purchaseTotals,
    adjustments,
    costTotals,
    products,
    purchaseAdjustments,
    purchaseCosts,
  };
};

router.get("/profits", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const data = await getProfits(startDate, endDate);

    res.json({ data: data });
  } catch (error) {
    next(error);
  }
});

router.get("/purchase-compare", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const [purchases] = await sequelize.query(
      `
      SELECT 
          "Pr"."id" as "productId",
          "Pr"."name" as "productName",
          "Pr"."cost" as "buyPrice",
          "S"."name" as "supplierName",
          SUM("PD"."qty") as "totalPurchased",
          SUM("PD"."price" * "PD"."qty") as "totalCost"
      FROM "Purchases" as "P"
      INNER JOIN "PurchaseDetails" as "PD" on "P"."id" = "PD"."PurchaseId"
      INNER JOIN "Products" as "Pr" on "Pr"."id" = "PD"."ProductId"
      INNER JOIN "Suppliers" as "S" on "S"."id" = "Pr"."SupplierId"
      WHERE "P"."date" >= '${startDate}'
      AND "P"."date" <= '${endDate}'
      GROUP BY "Pr"."id", "S"."name"
      ORDER BY "Pr"."name"
      `
    );

    const [sales] = await sequelize.query(
      `
      SELECT 
          "Pr"."id" as "productId",
          "Pr"."name" as "productName",
          "Pr"."price" as "salePrice",
          SUM("DD"."qty") as "totalSold",
          SUM("DD"."price" * "DD"."qty") as "totalSales"
      FROM "Deliveries" as "D"
      INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
      INNER JOIN "Products" as "Pr" on "Pr"."id" = "DD"."ProductId"
      WHERE "D"."date" >= '${startDate}'
      AND "D"."date" <= '${endDate}'
      GROUP BY "Pr"."id"
      ORDER BY "Pr"."name"
      `
    );
    res.json({ data: { sales, purchases } });
  } catch (error) {
    next(error);
  }
});

router.get("/print", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const { suppliers, totals, profits } = await getProfits(startDate, endDate);

    const {
      purchaseTotals,
      costTotals,
      adjustments,
      products,
      purchaseAdjustments,
      purchaseCosts,
    } = await getPurchaseTotals(startDate, endDate);

    const data = {
      suppliers: suppliers.map((sup) => {
        return {
          ...sup,
          products: profits.filter(
            (profit) => profit.supplierId === sup.supplierId
          ),
        };
      }),
      totals: totals[0],
      profits,
      startDate: moment(startDate).format("DD MMM YYYY"),
      endDate: moment(endDate).format("DD MMM YYYY"),
      purchaseTotals: purchaseTotals.map((pt) => {
        const supplierDeliveries = costTotals.find(
          (ct) => ct.supplierId === pt.supplierId
        );
        const costTotal = supplierDeliveries?.costTotal || 0;
        const adjustmentTotal =
          adjustments.find((adj) => adj.supplierId === pt.supplierId)
            ?.adjustmentTotal || 0;

        const supplierAdjustments = purchaseAdjustments.filter(
          (pa) => pa.supplierId === pt.supplierId
        );
        return {
          ...pt,
          subtotal: pt.total,
          products: products.filter(
            (product) => product.supplierId === pt.supplierId
          ),
          supplierAdjustments: supplierAdjustments,
          hasAdjustments: supplierAdjustments.length > 0,
          costTotal,
          hasDeliveryCost: !!parseInt(costTotal),
          supplierDeliveries,
          adjustmentTotal,
          total:
            parseInt(costTotal) +
            parseInt(pt.total) +
            parseInt(adjustmentTotal),
        };
      }),
      costTotals,
      adjustments,
      products,
    };

    const pdfStream = await createPDFStream(
      path.join(__dirname, "..", "..", "templates", "rs-report.hbs"),
      data
    );

    pdfStream.pipe(res);

    // const html = generateHTML(
    //   path.join(__dirname, "..", "..", "templates", "rs-report.hbs"),

    //   data
    // );
    // res.end(html);
  } catch (error) {
    next(error);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const { startDate, endDate, productId } = req.query;

    const [products] = await sequelize.query(
      `
        SELECT
                "D"."date" as "deliveryDate",
                "DD"."id",
                "C"."fullName" as "customerName",
                "P"."name" as "product",
                "DD"."price",
                "DD"."cost",
                "P"."SupplierId" as "supplierId",
                "P"."id" as "productId",
                "S"."name" as "supplierName",
                SUM("DD"."price" * "DD"."qty") as "totalPrice",
                SUM("DD"."qty") as "totalQty",
                SUM("DD"."cost" * "DD"."qty") as "totalCost",
                SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit",
                "D"."date" as "saleDate",
                "D"."id" as "DeliveryId",
                "I"."id" as "InvoiceId"
            FROM "Invoices" as "I"
        INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
        INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
        INNER JOIN "Products" as "P" ON "DD"."ProductId" = "P"."id"
        INNER JOIN "Suppliers" AS "S" ON "P"."SupplierId" = "S"."id"
        INNER JOIN "Customers" AS "C" ON "I"."CustomerId" = "C"."id"
            AND "D"."date" >= '${startDate}'
            AND "D"."date" <= '${endDate}'
            AND "P"."id" = ${productId}
        GROUP BY "product", "DD"."price", "DD"."cost", "supplierId", "S"."name", "productId", "customerName", "deliveryDate", "DD"."id", "D"."id", "I"."id"

        `
    );

    const [totals] = await sequelize.query(
      `
        SELECT
                "P"."name" as "product",
                "P"."id" as "productId",
                SUM("DD"."price" * "DD"."qty") as "totalPrice",
                SUM("DD"."qty") as "totalQty",
                SUM("DD"."cost" * "DD"."qty") as "totalCost",
                SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit"
            FROM "Invoices" as "I"
        INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
        INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
        INNER JOIN "Products" as "P" ON "DD"."ProductId" = "P"."id"
            AND "D"."date" >= '${startDate}'
            AND "D"."date" <= '${endDate}'
            AND "P"."id" = ${productId}
        GROUP BY "product", "productId"

        `
    );

    res.json({ data: { products, totals } });
  } catch (error) {
    next(error);
  }
});

router.get("/full-report", async (req, res, next) => {
  try {
    let { startDate, endDate } = req.query;
    if (!startDate) startDate = moment().format("YYYY-MM-DD");
    if (!endDate) endDate = moment().format("YYYY-MM-DD");
    const [sales] = await sequelize.query(
      `
      SELECT
        "pr"."id",
        "pr"."name",
        "dd"."price" as "salePrice",
        SUM("dd"."qty") as "totalQty",
        SUM("dd"."qty" * "dd"."price") as "totalSales"
      FROM "DeliveryDetails" as "dd"
      LEFT JOIN "Deliveries" as "d" on "d"."id" = "dd"."DeliveryId"
      LEFT JOIN "Products" as "pr" on "pr"."id" = "dd"."ProductId"
      WHERE "d"."date" >= '${startDate}' AND "d"."date" <= '${endDate}'
      GROUP BY "pr"."id", "pr"."name", "dd"."price"

        `
    );

    const [purchases] = await sequelize.query(
      `
      SELECT
        "pr"."id",
        "pr"."name",
        "pd"."price" as "buyPrice",
        SUM("pd"."qty") as "totalQty",
        SUM("pd"."qty" * "pd"."price") as "totalPurchases"
      FROM "PurchaseDetails" as "pd"
      LEFT JOIN "Purchases" as "p" on "p"."id" = "pd"."PurchaseId"
      LEFT JOIN "Products" as "pr" on "pr"."id" = "pd"."ProductId"
      WHERE "p"."date" >= '${startDate}' AND "p"."date" <= '${endDate}'
      GROUP BY "pr"."id", "pr"."name", "pd"."price"

        `
    );

    const [expenditures] = await sequelize.query(
      `
      SELECT
        "e"."id",
        "e"."name",
        "ed"."amount" as "expenseAmount",
        SUM("ed"."qty") as "totalQty",
        SUM("ed"."qty" * "ed"."amount") as "totalExpense"
      FROM "ExpenseDetails" as "ed"
      LEFT JOIN "Expenditures" as "ex" on "ex"."id" = "ed"."ExpenditureId"
      LEFT JOIN "Expenses" as "e" on "e"."id" = "ed"."ExpenseId"
      WHERE "ex"."date" >= '${startDate}' AND "ex"."date" <= '${endDate}'
      GROUP BY "e"."id", "e"."name", "ed"."amount"

        `
    );
    const totalSales = sales.reduce(
      (sum, sale) => sum + parseFloat(sale.totalSales),
      0
    );

    const totalPurchases = purchases.reduce(
      (sum, pur) => sum + parseFloat(pur.totalPurchases),
      0
    );
    const totalExpenditures = expenditures.reduce(
      (sum, ex) => sum + parseFloat(ex.totalExpense),
      0
    );

    const totalProfits = totalSales - totalPurchases - totalExpenditures;

    const pdfStream = await createPDFStream(
      path.join(__dirname, "..", "..", "templates", "full-report.hbs"),
      {
        sales,
        purchases,
        expenditures,
        totalProfits,
        startDate,
        endDate,
        totalSales,
        totalPurchases,
        totalExpenditures,
      }
    );

    pdfStream.pipe(res);

    // res.json({ data: { sales, purchases, expenditures, totalProfits } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
