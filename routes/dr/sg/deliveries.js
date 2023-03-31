const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      DrSgDelivery,
      DrSgDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrSgItem,
    },
  },
} = require("../../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const { unInvoiced, CustomerId, startDate, endDate } = req.query;
    const whereClause = {};

    if (CustomerId) {
      whereClause.CustomerId = CustomerId;
    }

    if (startDate) {
      whereClause.date = {
        [Op.gte]: startDate,
      };
    }

    if (endDate) {
      whereClause.date = {
        ...whereClause.date,
        [Op.lte]: endDate,
      };
    }

    if (unInvoiced === "true") {
      whereClause.DrInvoiceId = null;
    }
    const deliveries = await DrSgDelivery.findAll({
      where: whereClause,
      include: [DrSgDeliveryDetail, Customer, DrDiscountModel],
    });
    res.json({ data: deliveries });
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
      deliveryDetails,
      CustomerId,
      DrDiscountModelId,
      exchangeRate,
      deliveryCostType,
      DrInvoiceId,
    } = req.body;
    const newDelivery = DrSgDelivery.build({
      date,
      cost,
      note,
      CustomerId,
      DrDiscountModelId,
      exchangeRate,
      deliveryCostType,
      DrInvoiceId,
    });
    await newDelivery.save();

    for (const deliveryDetail of deliveryDetails) {
      const { priceSGD, qty, points, DrSgItemId, deliveryCost } =
        deliveryDetail;

      await newDelivery.createDrSgDeliveryDetail({
        priceSGD,
        qty,
        points,
        DrSgItemId,
        deliveryCost,
      });
    }

    res.json({ message: "Success", data: newDelivery });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const {
      date,
      cost,
      note,
      deliveryDetails,
      CustomerId,
      DrDiscountModelId,
      exchangeRate,
      deliveryCostType,
    } = req.body;

    const { id } = req.params;

    const delivery = await DrSgDelivery.findByPk(id, {
      include: [
        { model: DrSgDeliveryDetail, include: DrSgItem },
        { model: Customer },
        { model: DrDiscountModel },
      ],
    });

    await delivery.update(
      {
        date,
        cost,
        note,
        CustomerId,
        DrDiscountModelId,
        exchangeRate,
        deliveryCostType,
      },
      {
        where: {
          id: id,
        },
      }
    );

    await DrSgDeliveryDetail.destroy({
      where: {
        DrSgDeliveryId: delivery.id,
      },
    });

    for (const deliveryDetail of deliveryDetails) {
      const { priceSGD, qty, points, DrSgItemId, deliveryCost } =
        deliveryDetail;

      await delivery.createDrSgDeliveryDetail({
        priceSGD,
        qty,
        points,
        DrSgItemId,
        deliveryCost,
      });
    }

    res.json({ message: "Success", data: delivery });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delivery = await DrSgDelivery.findByPk(id, {
      include: [
        { model: DrSgDeliveryDetail, include: DrSgItem },
        { model: Customer },
        { model: DrDiscountModel },
      ],
    });
    if (!delivery) throw `Can't find delivery with id ${id}`;
    res.json({ data: delivery });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delivery = await DrSgDelivery.findByPk(id, {
      include: DrSgDeliveryDetail,
    });
    await delivery.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: delivery });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
