const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      DrMyDelivery,
      DrMyDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrMyItem,
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
    const deliveries = await DrMyDelivery.findAll({
      where: whereClause,
      include: [DrMyDeliveryDetail, Customer, DrDiscountModel],
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
    const newDelivery = DrMyDelivery.build({
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
      const { priceRM, qty, points, DrMyItemId, deliveryCost } = deliveryDetail;

      await newDelivery.createDrMyDeliveryDetail({
        priceRM,
        qty,
        points,
        DrMyItemId,
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

    const delivery = await DrMyDelivery.findByPk(id, {
      include: [
        { model: DrMyDeliveryDetail, include: DrMyItem },
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

    await DrMyDeliveryDetail.destroy({
      where: {
        DrMyDeliveryId: delivery.id,
      },
    });

    for (const deliveryDetail of deliveryDetails) {
      const { priceRM, qty, points, DrMyItemId, deliveryCost } = deliveryDetail;

      await delivery.createDrMyDeliveryDetail({
        priceRM,
        qty,
        points,
        DrMyItemId,
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
    const delivery = await DrMyDelivery.findByPk(id, {
      include: [
        { model: DrMyDeliveryDetail, include: DrMyItem },
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
    const delivery = await DrMyDelivery.findByPk(id, {
      include: DrMyDeliveryDetail,
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
