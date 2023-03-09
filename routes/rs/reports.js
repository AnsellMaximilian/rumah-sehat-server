const router = require("express").Router();
const {
  sequelize,
  sequelize: {
    models: { Product, ProductCategory, Supplier },
  },
} = require("../../models/index");

router.get("/profits", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

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
                "P"."price",
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
        GROUP BY "product", "P"."price", "P"."cost", "supplierId", "S"."name", "productId"

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

    res.json({ data: { profits, suppliers, totals } });
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
                SUM(("DD"."price" * "DD"."qty") - ("DD"."cost" * "DD"."qty")) as "profit"
            FROM "Invoices" as "I"
        INNER JOIN "Deliveries" as "D" ON "I"."id" = "D"."InvoiceId"
        INNER JOIN "DeliveryDetails" as "DD" on "D"."id" = "DD"."DeliveryId"
        INNER JOIN "Products" as "P" ON "DD"."ProductId" = "P"."id"
        INNER JOIN "Suppliers" AS "S" ON "P"."SupplierId" = "S"."id"
        INNER JOIN "Customers" AS "C" ON "I"."CustomerId" = "C"."id"
            AND "D"."date" >= '${startDate}'
            AND "D"."date" <= '${endDate}'
            AND "P"."id" = ${productId}
        GROUP BY "product", "DD"."price", "DD"."cost", "supplierId", "S"."name", "productId", "customerName", "deliveryDate", "DD"."id"

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

module.exports = router;
