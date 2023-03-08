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

    res.json({ data: { profits, suppliers } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
