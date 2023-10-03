const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize,
  sequelize: {
    models: {
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Invoice,
      PurchaseDetail,
      Purchase,
      DeliveryExpense,
    },
  },
} = require("../../models/index");

// router.get("/", async (req, res, next) => {
//   try {
//     const {
//       CustomerId,
//       deliveryStartDate,
//       deliveryEndDate,
//       invoiceStartDate,
//       invoiceEndDate,
//       ProductId,
//     } = req.query;

//     const whereClause = {};
//     const invoicesWhereClause = {};
//     const deliveriesWhereClause = {};

//     if (deliveryStartDate) {
//       deliveriesWhereClause.date = {
//         [Op.gte]: deliveryStartDate,
//       };
//     }

//     if (deliveryEndDate) {
//       deliveriesWhereClause.date = {
//         ...deliveriesWhereClause.date,
//         [Op.lte]: deliveryEndDate,
//       };
//     }

//     if (CustomerId) {
//       deliveriesWhereClause.CustomerId = CustomerId;
//     }

//     if (invoiceStartDate) {
//       invoicesWhereClause.date = {
//         [Op.gte]: invoiceStartDate,
//       };
//     }

//     if (invoiceEndDate) {
//       invoicesWhereClause.date = {
//         ...invoicesWhereClause.date,
//         [Op.lte]: invoiceEndDate,
//       };
//     }

//     if (ProductId) {
//       whereClause.ProductId = ProductId;
//     }

//     const deliveries = await DeliveryDetail.findAll({
//       where: whereClause,
//       include: [
//         {
//           model: Delivery,
//           //   group: ["date"],

//           ...(Object.keys(deliveriesWhereClause).length > 0
//             ? { where: deliveriesWhereClause }
//             : {}),
//           include: [
//             Customer,
//             DeliveryType,
//             {
//               model: Invoice,
//               ...(Object.keys(invoicesWhereClause).length > 0
//                 ? { where: invoicesWhereClause }
//                 : {}),
//             },
//           ],
//         },
//       ],
//     });
//     res.json({ data: deliveries });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const {
      CustomerId,
      deliveryStartDate,
      deliveryEndDate,
      invoiceStartDate,
      invoiceEndDate,
      ProductId,
    } = req.query;

    let whereApplied = false;

    let whereClause = "";

    if (deliveryStartDate && deliveryEndDate) {
      whereClause += `WHERE "d"."date" >= '${deliveryStartDate}' AND "d"."date" <= '${deliveryEndDate}' `;
      whereApplied = true;
    }

    if (invoiceStartDate && invoiceEndDate) {
      let tempClause = `"i"."date" >= '${invoiceStartDate}' AND "i"."date" <= '${invoiceEndDate}' `;
      if (!whereApplied) {
        whereClause = "WHERE " + tempClause;
        whereApplied = true;
      } else {
        whereClause = whereClause + "AND " + tempClause;
      }
    }

    if (CustomerId) {
      let tempClause = `"d"."CustomerId" = ${CustomerId} `;
      if (!whereApplied) {
        whereClause = "WHERE " + tempClause;
        whereApplied = true;
      } else {
        whereClause = whereClause + "AND " + tempClause;
      }
    }

    if (ProductId) {
      let tempClause = `"dd"."ProductId" = ${ProductId} `;
      if (!whereApplied) {
        whereClause = "WHERE " + tempClause;
        whereApplied = true;
      } else {
        whereClause = whereClause + "AND " + tempClause;
      }
    }
    const [analytics] = await sequelize.query(
      `
        SELECT
            "d"."date" as "date",
            SUM("dd"."qty") as "qty",
            SUM("dd"."price" * "dd"."qty") as "revenue", 
            SUM(COALESCE("dd"."overallCost", "dd"."cost") * "dd"."qty") as "expense",
            SUM(("dd"."price" * "dd"."qty") - (COALESCE("dd"."overallCost", "dd"."cost") * "dd"."qty")) as "profit" 
        FROM "DeliveryDetails" as "dd"
        INNER JOIN "Deliveries" as "d" on "d"."id" = "dd"."DeliveryId"
        INNER JOIN "Invoices" as "i" on "i"."id" = "d"."InvoiceId"
        INNER JOIN "Products" as "p" on "p"."id" = "dd"."ProductId"
        INNER JOIN "Customers" as "c" on "c"."id" = "d"."CustomerId"
        ${whereClause}
        GROUP BY "d"."date"
        `
    );

    res.json({ data: analytics });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
