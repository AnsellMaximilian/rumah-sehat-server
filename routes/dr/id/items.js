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
    },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const items = await DrIdItem.findAll();
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
