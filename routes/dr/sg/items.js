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
    },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const items = await DrSgItem.findAll();
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, priceSGD, points, deliveryCost, weight, keepStockSince } =
      req.body;

    const newItem = DrSgItem.build({
      name,
      priceSGD,
      points,
      deliveryCost,
      weight,
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

router.patch("/:id", async (req, res, next) => {
  try {
    const { name, priceSGD, points, deliveryCost, weight, keepStockSince } =
      req.body;
    const { id } = req.params;

    const item = await DrSgItem.findByPk(id);

    await item.update(
      { name, priceSGD, points, deliveryCost, weight, keepStockSince },
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
