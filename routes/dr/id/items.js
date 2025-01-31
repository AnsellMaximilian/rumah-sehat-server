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
    const { name, priceRP, points, keepStockSince } = req.body;

    const newItem = DrIdItem.build({
      name,
      priceRP,
      points,

      keepStockSince,
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
    const matches = await DrIdStockMatch.findAll({
      where: {
        DrIdItemId: id,
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
    const item = await DrIdItem.findByPk(id, {
      // include: [PurchaseDetail, DeliveryDetail, Draw],
    });
    if (!item) throw `Can't find item with id ${id}`;
    if (item.keepStockSince !== null) {
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
        COALESCE(SUM("dd"."amount"), 0) as "totalOut",
        COALESCE(SUM("sa"."amount"), 0) as "totalAdjusted",
        COALESCE(SUM("lo"."amount"), 0) as "totalLoaned",
        (COALESCE(SUM("dd"."amount"), 0) + COALESCE(SUM("sa"."amount"), 0) + COALESCE(SUM("lo"."amount"), 0)) as "stock"
      FROM "DrIdItems" as "p"
      LEFT JOIN
        (
          SELECT 
            "DrIdItems"."id" as "itemId", sum("DrIdDeliveryDetails"."qty") as "amount"
          FROM "DrIdDeliveryDetails"
          inner join "DrIdDeliveries" on "DrIdDeliveries"."id" = "DrIdDeliveryDetails"."DrIdDeliveryId"
          inner join "DrIdItems" on "DrIdDeliveryDetails"."DrIdItemId" = "DrIdItems"."id"
          Where "DrIdItems"."keepStockSince" is not null and "DrIdDeliveries"."date" >= "DrIdItems"."keepStockSince"
          group by "itemId"
        ) as "dd"
        ON "dd"."itemId" = "p"."id"
      LEFT JOIN
        (
          SELECT 
            "DrIdItems"."id" as "itemId", sum("DrIdStockAdjustments"."amount") as "amount"
          FROM "DrIdStockAdjustments"
          inner join "DrIdItems" on "DrIdStockAdjustments"."DrIdItemId" = "DrIdItems"."id"
          Where "DrIdItems"."keepStockSince" is not null and "DrIdStockAdjustments"."date" >= "DrIdItems"."keepStockSince"
          group by "itemId"
        ) as "sa"
        ON "sa"."itemId" = "p"."id"
      LEFT JOIN
        (
          SELECT 
            "DrIdItems"."id" as "itemId", 
            SUM(CASE 
                    WHEN "DrIdLoans"."returnDate" IS NOT NULL THEN 0
                    WHEN "DrIdLoans"."lendType" = 'lend' THEN -"DrIdLoans"."qty"
                    ELSE "DrIdLoans"."qty"
                END) as "amount"
          FROM "DrIdLoans"
          INNER JOIN "DrIdItems" on "DrIdLoans"."DrIdItemId" = "DrIdItems"."id"
          WHERE "DrIdItems"."keepStockSince" is not null AND "DrIdLoans"."date" >= "DrIdItems"."keepStockSince"
          GROUP BY "itemId"
        ) as "lo"
        ON "lo"."itemId" = "p"."id"
      WHERE "p"."keepStockSince" is not null
      GROUP BY
        "p"."name", "p"."id"
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
    const { name, priceRP, points, keepStockSince } = req.body;
    const { id } = req.params;

    const item = await DrIdItem.findByPk(id);

    await item.update(
      { name, priceRP, points, keepStockSince },
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

module.exports = router;
