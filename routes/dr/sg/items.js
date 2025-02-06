const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      DrSgItem,
      DrSgDeliveryDetail,
      DrSgStockAdjustment,
      DrSgLoan,
      DrSgDelivery,
      Customer,
      DrSgStockMatch,
    },
  },
  sequelize,
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { name, activeStatus } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (!activeStatus) {
      whereClause.isActive = true;
    } else if (activeStatus !== "all")
      whereClause.isActive = activeStatus === "active";

    const items = await DrSgItem.findAll({
      where: whereClause,
    });
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      priceSGD,
      points,
      deliveryCost,
      weight,
      keepStockSince,
      isBundle,
    } = req.body;

    const newItem = DrSgItem.build({
      name,
      priceSGD,
      points,
      deliveryCost,
      weight,
      keepStockSince,
      isBundle,
    });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/adjust-stock", async (req, res, next) => {
  try {
    const { amount, date, description } = req.body;

    const { id } = req.params;

    const newAdj = DrSgStockAdjustment.build({
      amount,
      date,
      DrSgItemId: id,
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
    const newMatch = DrSgStockMatch.build({
      qty,
      date,
      DrSgItemId: id,
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
    const item = await DrSgItem.findByPk(id, {
      include: [DrSgDeliveryDetail],
    });
    if (!item) throw `Can't find item with id ${id}`;
    if (item.keepStockSince !== null) {
      const outgoing = await DrSgDelivery.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
        },
        include: [
          {
            model: DrSgDeliveryDetail,
            where: {
              DrSgItemId: item.id,
            },
          },
        ],
      });
      const loans = await DrSgLoan.findAll({
        where: {
          DrSgItemId: item.id,
          date: {
            [Op.gte]: item.keepStockSince,
          },
        },
      });
      const adjustments = await DrSgStockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrSgItemId: item.id,
        },
      });

      const outgoingNumber = outgoing.reduce(
        (sum, out) =>
          sum +
          out.DrSgDeliveryDetails.reduce(
            (sum, dd) => sum + parseFloat(dd.qty),
            0
          ),
        0
      );

      const adjustmentNumber = adjustments.reduce(
        (sum, adj) => sum + parseFloat(adj.amount),
        0
      );

      const loanNumber = loans.reduce(
        (sum, loan) => sum + parseFloat(loan.stockValue),
        0
      );

      stock = -outgoingNumber + adjustmentNumber + loanNumber;
    }

    res.json({ data: stock });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/stock-matches", async (req, res, next) => {
  try {
    const { id } = req.params;
    const matches = await DrSgStockMatch.findAll({
      where: {
        DrSgItemId: id,
      },
      order: [
        ["date", "DESC"],
        ["createdAt", "DESC"],
      ],
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
    const item = await DrSgItem.findByPk(id, {
      // include: [PurchaseDetail, DeliveryDetail, Draw],
    });
    if (!item) throw `Can't find item with id ${id}`;
    if (item.keepStockSince !== null) {
      const deliveryDetails = await DrSgDeliveryDetail.findAll({
        where: {
          DrSgItemId: item.id,
        },
        include: [
          {
            model: DrSgDelivery,
            include: Customer,
            where: {
              date: {
                [Op.gte]: item.keepStockSince,
              },
            },
          },
        ],
      });

      const adjustments = await DrSgStockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrSgItemId: item.id,
        },
      });
      const loans = await DrSgLoan.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrSgItemId: item.id,
        },
      });
      return res.json({
        data: { deliveryDetails, adjustments, loans },
      });
    }
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
          COALESCE(SUM("dd"."amount"), 0) AS "totalOut",
          COALESCE(SUM("sa"."amount"), 0) AS "totalAdjusted",
          COALESCE(SUM("lo"."amount"), 0) AS "totalLoaned",
          COALESCE(SUM("bundleStock"."totalOut"), 0) AS "bundleTotalOut",
          COALESCE(SUM("bundleStock"."totalAdjusted"), 0) AS "bundleTotalAdjusted",
          COALESCE(SUM("bundleStock"."totalLoaned"), 0) AS "bundleTotalLoaned",
          (
            COALESCE(SUM("sa"."amount"), 0) -
            COALESCE(SUM("dd"."amount"), 0) + 
            
            COALESCE(SUM("lo"."amount"), 0) + 
            (
              COALESCE(SUM("bundleStock"."totalAdjusted"), 0) - 
              COALESCE(SUM("bundleStock"."totalOut"), 0) + 
              COALESCE(SUM("bundleStock"."totalLoaned"), 0)
            )
          ) AS "stock",
          "pm"."latestStockMatchDate",
          "pm"."latestStockMatchQty"
      FROM "DrSgItems" AS "p"
      LEFT JOIN
          (
              SELECT 
                  "DrSgItems"."id" AS "itemId", SUM("DrSgDeliveryDetails"."qty") AS "amount"
              FROM "DrSgDeliveryDetails"
              INNER JOIN "DrSgDeliveries" ON "DrSgDeliveries"."id" = "DrSgDeliveryDetails"."DrSgDeliveryId"
              INNER JOIN "DrSgItems" ON "DrSgDeliveryDetails"."DrSgItemId" = "DrSgItems"."id"
              WHERE "DrSgItems"."keepStockSince" IS NOT NULL 
                AND "DrSgDeliveries"."date" >= "DrSgItems"."keepStockSince"
                AND "DrSgItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "dd"
          ON "dd"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT 
                  "DrSgItems"."id" AS "itemId", SUM("DrSgStockAdjustments"."amount") AS "amount"
              FROM "DrSgStockAdjustments"
              INNER JOIN "DrSgItems" ON "DrSgStockAdjustments"."DrSgItemId" = "DrSgItems"."id"
              WHERE "DrSgItems"."keepStockSince" IS NOT NULL 
                AND "DrSgStockAdjustments"."date" >= "DrSgItems"."keepStockSince"
                AND "DrSgItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "sa"
          ON "sa"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT 
                  "DrSgItems"."id" AS "itemId", 
                  SUM(
                      CASE 
                          WHEN "DrSgLoans"."returnDate" IS NOT NULL THEN 0
                          WHEN "DrSgLoans"."lendType" = 'lend' THEN -"DrSgLoans"."qty"
                          ELSE "DrSgLoans"."qty"
                      END
                  ) AS "amount"
              FROM "DrSgLoans"
              INNER JOIN "DrSgItems" ON "DrSgLoans"."DrSgItemId" = "DrSgItems"."id"
              WHERE "DrSgItems"."keepStockSince" IS NOT NULL 
                AND "DrSgLoans"."date" >= "DrSgItems"."keepStockSince"
                AND "DrSgItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "lo"
          ON "lo"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT DISTINCT ON ("pm1"."DrSgItemId") 
                  "pm1"."DrSgItemId" AS "itemId",
                  "pm1"."date" AS "latestStockMatchDate",
                  "pm1"."qty" AS "latestStockMatchQty"
              FROM "DrSgStockMatches" AS "pm1"
              ORDER BY "pm1"."DrSgItemId", "pm1"."date" DESC, "pm1"."createdAt" DESC
          ) AS "pm"
          ON "pm"."itemId" = "p"."id"
      LEFT JOIN 
          (
              SELECT 
                  "bi"."DrSgItemId" AS "itemId", 
                  SUM("dd"."amount" * "bi"."qty") AS "totalOut",
                  SUM("sa"."amount" * "bi"."qty") AS "totalAdjusted",
                  SUM("lo"."amount" * "bi"."qty") AS "totalLoaned"
				
              FROM "DrSgBundleItems" AS "bi"
              INNER JOIN "DrSgBundles" AS "b" ON "b"."id" = "bi"."DrSgBundleId"
              INNER JOIN "DrSgItems" AS "parentItem" ON "b"."DrSgItemId" = "parentItem"."id" 
              INNER JOIN "DrSgItems" AS "i" ON "i"."id" = "bi"."DrSgItemId" 
              LEFT JOIN
                  (
                      SELECT 
                          "DrSgItems"."id" AS "itemId", SUM("DrSgDeliveryDetails"."qty") AS "amount", "DrSgDeliveries"."date" as "date"
                      FROM "DrSgDeliveryDetails"
                      INNER JOIN "DrSgDeliveries" ON "DrSgDeliveries"."id" = "DrSgDeliveryDetails"."DrSgDeliveryId"
                      INNER JOIN "DrSgItems" ON "DrSgDeliveryDetails"."DrSgItemId" = "DrSgItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "dd"
              ON "dd"."itemId" = "parentItem"."id"  and "dd"."date" >= "i"."keepStockSince"
              LEFT JOIN
                  (
                      SELECT 
                          "DrSgItems"."id" AS "itemId", SUM("DrSgStockAdjustments"."amount") AS "amount", "DrSgStockAdjustments"."date" as "date"
                      FROM "DrSgStockAdjustments"
                      INNER JOIN "DrSgItems" ON "DrSgStockAdjustments"."DrSgItemId" = "DrSgItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "sa"
              ON "sa"."itemId" = "parentItem"."id" and "sa"."date" >= "i"."keepStockSince"
              LEFT JOIN
                  (
                      SELECT 
                          "DrSgItems"."id" AS "itemId", "DrSgLoans"."date" as "date",
                          SUM(
                              CASE 
                                  WHEN "DrSgLoans"."returnDate" IS NOT NULL THEN 0
                                  WHEN "DrSgLoans"."lendType" = 'lend' THEN -"DrSgLoans"."qty"
                                  ELSE "DrSgLoans"."qty"
                              END
                          ) AS "amount"
                      FROM "DrSgLoans"
                      INNER JOIN "DrSgItems" ON "DrSgLoans"."DrSgItemId" = "DrSgItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "lo"
              ON "lo"."itemId" = "parentItem"."id" and "lo"."date" >= "i"."keepStockSince"
              WHERE "i"."keepStockSince" IS NOT NULL 
              GROUP BY "bi"."DrSgItemId"
          ) AS "bundleStock"
      ON "bundleStock"."itemId" = "p"."id"

      WHERE "p"."keepStockSince" IS NOT NULL
      AND "p"."isBundle" = FALSE  
      GROUP BY
          "p"."name", "p"."id",
          "pm"."latestStockMatchDate", "pm"."latestStockMatchQty"
      ORDER BY
          "p"."name" ASC;
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
    const item = await DrSgItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/cycle-active-status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrSgItem.findByPk(id);
    item.update({
      isActive: !item.isActive,
    });
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const {
      name,
      priceSGD,
      points,
      deliveryCost,
      weight,
      keepStockSince,
      isBundle,
    } = req.body;
    const { id } = req.params;

    const item = await DrSgItem.findByPk(id);

    await item.update(
      {
        name,
        priceSGD,
        points,
        deliveryCost,
        weight,
        keepStockSince,
        isBundle,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrSgItem.findByPk(id, { include: DrSgDeliveryDetail });
    if (item.DrSgDeliveryDetails.length > 0)
      throw "Cannot delete. Item has associated delivery details.";

    await item.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
