const router = require("express").Router();
const { Op } = require("sequelize");
const { makeError } = require("../../../helpers/errors");
const {
  sequelize: {
    models: {
      DrIdItem,
      DrIdDeliveryDetail,
      DrIdStockAdjustment,
      DrIdDelivery,
      Customer,
      DrIdLoan,
      DrIdStockMatch,
      DrIdBundle,
      DrIdBundleItem,
    },
  },
  sequelize,
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { name, activeStatus, isBundle } = req.query;

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

    if (isBundle) whereClause.isBundle = isBundle === "true";

    const items = await DrIdItem.findAll({
      where: whereClause,
    });
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, priceRP, points, keepStockSince, isBundle } = req.body;

    const newItem = DrIdItem.build({
      name,
      priceRP,
      points,

      keepStockSince,
      isBundle,
    });
    await newItem.save();

    res.json({ message: "Success", data: newItem });
  } catch (error) {
    next(error);
  }
});

router.post("/bulk-adjust-stock", async (req, res, next) => {
  try {
    const { adjustmentItems } = req.body;

    const newAdjustments = await DrIdStockAdjustment.bulkCreate(
      adjustmentItems.map((adjustment) => {
        const { amount, date, description, DrIdItemId } = adjustment;
        return {
          amount,
          date,
          DrIdItemId,
          description,
        };
      })
    );

    res.json({ message: "Success", data: newAdjustments });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/adjust-stock", async (req, res, next) => {
  try {
    const { amount, date, description } = req.body;

    const { id } = req.params;

    const newAdj = DrIdStockAdjustment.build({
      amount,
      date,
      DrIdItemId: id,
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

    const newMatch = DrIdStockMatch.build({
      qty,
      date,
      DrIdItemId: id,
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
    const item = await DrIdItem.findByPk(id, {
      include: [DrIdDeliveryDetail],
    });

    if (!item) throw `Can't find item with id ${id}`;
    if (item.keepStockSince !== null) {
      const outgoing = await DrIdDelivery.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
        },
        include: [
          {
            model: DrIdDeliveryDetail,
            where: {
              DrIdItemId: item.id,
            },
          },
        ],
      });
      const loans = await DrIdLoan.findAll({
        where: {
          DrIdItemId: item.id,
          date: {
            [Op.gte]: item.keepStockSince,
          },
        },
      });
      const adjustments = await DrIdStockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrIdItemId: item.id,
        },
      });

      const outgoingNumber = outgoing.reduce(
        (sum, out) =>
          sum +
          out.DrIdDeliveryDetails.reduce(
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

      const bundleStock = await getBundleStock(item);

      stock = -outgoingNumber + adjustmentNumber + loanNumber + bundleStock;
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

    const matches = await DrIdStockMatch.findAll({
      where: {
        DrIdItemId: id,
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
    const item = await DrIdItem.findByPk(id, {
      include: [{ model: DrIdBundleItem, include: [DrIdBundle] }],
    });
    if (!item) throw `Can't find item with id ${id}`;
    if (item.keepStockSince !== null) {
      const bundleItemIds = item.DrIdBundleItems.map(
        (bi) => bi.DrIdBundle.DrIdItemId
      );

      const deliveryDetails = await DrIdDeliveryDetail.findAll({
        where: {
          DrIdItemId: item.id,
        },
        include: [
          {
            model: DrIdDelivery,
            include: Customer,
            where: {
              date: {
                [Op.gte]: item.keepStockSince,
              },
            },
          },
        ],
      });

      const adjustments = await DrIdStockAdjustment.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrIdItemId: item.id,
        },
      });
      const loans = await DrIdLoan.findAll({
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrIdItemId: item.id,
        },
      });

      // BUNDLE
      const bundleDeliveryDetails = await DrIdDeliveryDetail.findAll({
        where: {
          DrIdItemId: {
            [Op.in]: bundleItemIds,
          },
        },
        include: [
          { model: DrIdItem },
          {
            model: DrIdDelivery,
            include: Customer,
            where: {
              date: {
                [Op.gte]: item.keepStockSince,
              },
            },
          },
        ],
      });

      const bundleAdjustments = await DrIdStockAdjustment.findAll({
        include: [DrIdItem],
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrIdItemId: {
            [Op.in]: bundleItemIds,
          },
        },
      });
      const bundleLoans = await DrIdLoan.findAll({
        include: [DrIdItem],
        where: {
          date: {
            [Op.gte]: item.keepStockSince,
          },
          DrIdItemId: {
            [Op.in]: bundleItemIds,
          },
        },
      });

      return res.json({
        data: {
          deliveryDetails,
          adjustments,
          loans,
          bundleAdjustments,
          bundleDeliveryDetails,
          bundleLoans,
        },
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
      FROM "DrIdItems" AS "p"
      LEFT JOIN
          (
              SELECT 
                  "DrIdItems"."id" AS "itemId", SUM("DrIdDeliveryDetails"."qty") AS "amount"
              FROM "DrIdDeliveryDetails"
              INNER JOIN "DrIdDeliveries" ON "DrIdDeliveries"."id" = "DrIdDeliveryDetails"."DrIdDeliveryId"
              INNER JOIN "DrIdItems" ON "DrIdDeliveryDetails"."DrIdItemId" = "DrIdItems"."id"
              WHERE "DrIdItems"."keepStockSince" IS NOT NULL 
                AND "DrIdDeliveries"."date" >= "DrIdItems"."keepStockSince"
                AND "DrIdItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "dd"
          ON "dd"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT 
                  "DrIdItems"."id" AS "itemId", SUM("DrIdStockAdjustments"."amount") AS "amount"
              FROM "DrIdStockAdjustments"
              INNER JOIN "DrIdItems" ON "DrIdStockAdjustments"."DrIdItemId" = "DrIdItems"."id"
              WHERE "DrIdItems"."keepStockSince" IS NOT NULL 
                AND "DrIdStockAdjustments"."date" >= "DrIdItems"."keepStockSince"
                AND "DrIdItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "sa"
          ON "sa"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT 
                  "DrIdItems"."id" AS "itemId", 
                  SUM(
                      CASE 
                          WHEN "DrIdLoans"."returnDate" IS NOT NULL THEN 0
                          WHEN "DrIdLoans"."lendType" = 'lend' THEN -"DrIdLoans"."qty"
                          ELSE "DrIdLoans"."qty"
                      END
                  ) AS "amount"
              FROM "DrIdLoans"
              INNER JOIN "DrIdItems" ON "DrIdLoans"."DrIdItemId" = "DrIdItems"."id"
              WHERE "DrIdItems"."keepStockSince" IS NOT NULL 
                AND "DrIdLoans"."date" >= "DrIdItems"."keepStockSince"
                AND "DrIdItems"."isBundle" = FALSE
              GROUP BY "itemId"
          ) AS "lo"
          ON "lo"."itemId" = "p"."id"
      LEFT JOIN
          (
              SELECT DISTINCT ON ("pm1"."DrIdItemId") 
                  "pm1"."DrIdItemId" AS "itemId",
                  "pm1"."date" AS "latestStockMatchDate",
                  "pm1"."qty" AS "latestStockMatchQty"
              FROM "DrIdStockMatches" AS "pm1"
              ORDER BY "pm1"."DrIdItemId", "pm1"."date" DESC, "pm1"."createdAt" DESC
          ) AS "pm"
          ON "pm"."itemId" = "p"."id"
      LEFT JOIN 
          (
              SELECT 
                  "bi"."DrIdItemId" AS "itemId", 
                  COALESCE(SUM("dd"."amount" * "bi"."qty"), 0) AS "totalOut",
                  COALESCE(SUM("sa"."amount" * "bi"."qty"), 0) AS "totalAdjusted",
                  COALESCE(SUM("lo"."amount" * "bi"."qty"), 0) AS "totalLoaned"
				
              FROM "DrIdBundleItems" AS "bi"
              INNER JOIN "DrIdBundles" AS "b" ON "b"."id" = "bi"."DrIdBundleId"
              INNER JOIN "DrIdItems" AS "parentItem" ON "b"."DrIdItemId" = "parentItem"."id" 
              INNER JOIN "DrIdItems" AS "i" ON "i"."id" = "bi"."DrIdItemId" 
              LEFT JOIN
                  (
                      SELECT 
                          "DrIdItems"."id" AS "itemId", SUM("DrIdDeliveryDetails"."qty") AS "amount", "DrIdDeliveries"."date" as "date"
                      FROM "DrIdDeliveryDetails"
                      INNER JOIN "DrIdDeliveries" ON "DrIdDeliveries"."id" = "DrIdDeliveryDetails"."DrIdDeliveryId"
                      INNER JOIN "DrIdItems" ON "DrIdDeliveryDetails"."DrIdItemId" = "DrIdItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "dd"
              ON "dd"."itemId" = "parentItem"."id"  and "dd"."date" >= "i"."keepStockSince"
              LEFT JOIN
                  (
                      SELECT 
                          "DrIdItems"."id" AS "itemId", SUM("DrIdStockAdjustments"."amount") AS "amount", "DrIdStockAdjustments"."date" as "date"
                      FROM "DrIdStockAdjustments"
                      INNER JOIN "DrIdItems" ON "DrIdStockAdjustments"."DrIdItemId" = "DrIdItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "sa"
              ON "sa"."itemId" = "parentItem"."id" and "sa"."date" >= "i"."keepStockSince"
              LEFT JOIN
                  (
                      SELECT 
                          "DrIdItems"."id" AS "itemId", "DrIdLoans"."date" as "date",
                          SUM(
                              CASE 
                                  WHEN "DrIdLoans"."returnDate" IS NOT NULL THEN 0
                                  WHEN "DrIdLoans"."lendType" = 'lend' THEN -"DrIdLoans"."qty"
                                  ELSE "DrIdLoans"."qty"
                              END
                          ) AS "amount"
                      FROM "DrIdLoans"
                      INNER JOIN "DrIdItems" ON "DrIdLoans"."DrIdItemId" = "DrIdItems"."id"
                      GROUP BY "itemId", "date"
                  ) AS "lo"
              ON "lo"."itemId" = "parentItem"."id" and "lo"."date" >= "i"."keepStockSince"
              WHERE "i"."keepStockSince" IS NOT NULL 
              GROUP BY "bi"."DrIdItemId"
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
    const item = await DrIdItem.findByPk(id);
    if (!item) throw `Can't find item with id ${id}`;
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/cycle-active-status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await DrIdItem.findByPk(id);
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
    const { name, priceRP, points, keepStockSince, isBundle } = req.body;
    const { id } = req.params;

    const item = await DrIdItem.findByPk(id);

    await item.update(
      { name, priceRP, points, keepStockSince, isBundle },
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
    const item = await DrIdItem.findByPk(id, { include: DrIdDeliveryDetail });
    if (item.DrIdDeliveryDetails.length > 0)
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

// item: DrIdItem
async function getBundleStock(item) {
  if (!item.keepStockSince) return 0;

  const [res] = await sequelize.query(
    `
    SELECT 
        "bi"."DrIdItemId" AS "itemId", 
        COALESCE(SUM("dd"."amount" * "bi"."qty"), 0) AS "totalOut",
        COALESCE(SUM("sa"."amount" * "bi"."qty"), 0) AS "totalAdjusted",
        COALESCE(SUM("lo"."amount" * "bi"."qty"), 0) AS "totalLoaned"

    FROM "DrIdBundleItems" AS "bi"
    INNER JOIN "DrIdBundles" AS "b" ON "b"."id" = "bi"."DrIdBundleId"
    INNER JOIN "DrIdItems" AS "parentItem" ON "b"."DrIdItemId" = "parentItem"."id" 
    INNER JOIN "DrIdItems" AS "i" ON "i"."id" = "bi"."DrIdItemId" 
    LEFT JOIN
        (
            SELECT 
                "DrIdItems"."id" AS "itemId", SUM("DrIdDeliveryDetails"."qty") AS "amount", "DrIdDeliveries"."date" as "date"
            FROM "DrIdDeliveryDetails"
            INNER JOIN "DrIdDeliveries" ON "DrIdDeliveries"."id" = "DrIdDeliveryDetails"."DrIdDeliveryId"
            INNER JOIN "DrIdItems" ON "DrIdDeliveryDetails"."DrIdItemId" = "DrIdItems"."id"
            GROUP BY "itemId", "date"
        ) AS "dd"
    ON "dd"."itemId" = "parentItem"."id"  and "dd"."date" >= "i"."keepStockSince"
    LEFT JOIN
        (
            SELECT 
                "DrIdItems"."id" AS "itemId", SUM("DrIdStockAdjustments"."amount") AS "amount", "DrIdStockAdjustments"."date" as "date"
            FROM "DrIdStockAdjustments"
            INNER JOIN "DrIdItems" ON "DrIdStockAdjustments"."DrIdItemId" = "DrIdItems"."id"
            GROUP BY "itemId", "date"
        ) AS "sa"
    ON "sa"."itemId" = "parentItem"."id" and "sa"."date" >= "i"."keepStockSince"
    LEFT JOIN
        (
            SELECT 
                "DrIdItems"."id" AS "itemId", "DrIdLoans"."date" as "date",
                SUM(
                    CASE 
                        WHEN "DrIdLoans"."returnDate" IS NOT NULL THEN 0
                        WHEN "DrIdLoans"."lendType" = 'lend' THEN -"DrIdLoans"."qty"
                        ELSE "DrIdLoans"."qty"
                    END
                ) AS "amount"
            FROM "DrIdLoans"
            INNER JOIN "DrIdItems" ON "DrIdLoans"."DrIdItemId" = "DrIdItems"."id"
            GROUP BY "itemId", "date"
        ) AS "lo"
    ON "lo"."itemId" = "parentItem"."id" and "lo"."date" >= "i"."keepStockSince"
    WHERE "i"."keepStockSince" IS NOT NULL AND "i"."id" = ${item.id}
    GROUP BY "bi"."DrIdItemId"`
  );

  const bundleStock = res[0];

  if (!bundleStock) return 0;

  return (
    parseFloat(bundleStock.totalAdjusted) +
    parseFloat(bundleStock.totalLoaned) -
    parseFloat(bundleStock.totalOut)
  );
}

module.exports = router;
