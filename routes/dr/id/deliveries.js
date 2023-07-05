const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      DrIdDelivery,
      DrIdDeliveryDetail,
      Customer,
      DrDiscountModel,
      DrIdItem,
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
    const deliveries = await DrIdDelivery.findAll({
      where: whereClause,
      include: [DrIdDeliveryDetail, Customer, DrDiscountModel],
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
      DrInvoiceId,
    } = req.body;
    const newDelivery = DrIdDelivery.build({
      date,
      cost,
      note,
      CustomerId,
      DrInvoiceId,
      DrDiscountModelId,
    });
    await newDelivery.save();

    for (const deliveryDetail of deliveryDetails) {
      const { priceRP, qty, points, DrIdItemId, free } = deliveryDetail;
      console.log({ priceRP, qty, points, DrIdItemId });

      await newDelivery.createDrIdDeliveryDetail({
        priceRP,
        qty,
        points,
        DrIdItemId,
        free,
      });
    }

    res.json({ message: "Success", data: newDelivery });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { date, cost, note, deliveryDetails, CustomerId, DrDiscountModelId } =
      req.body;
    const { id } = req.params;

    const delivery = await DrIdDelivery.findByPk(id, {
      include: [
        { model: DrIdDeliveryDetail, include: DrIdItem },
        { model: Customer },
        { model: DrDiscountModel },
      ],
    });

    await delivery.update(
      { date, cost, note, CustomerId, DrDiscountModelId },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete delivery details
    await DrIdDeliveryDetail.destroy({
      where: {
        DrIdDeliveryId: delivery.id,
      },
    });

    // replace delivery details
    for (const deliveryDetail of deliveryDetails) {
      const { priceRP, qty, points, DrIdItemId, free } = deliveryDetail;

      await delivery.createDrIdDeliveryDetail({
        priceRP,
        qty,
        points,
        DrIdItemId,
        free,
      });
    }

    res.json({ data: delivery });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delivery = await DrIdDelivery.findByPk(id, {
      include: [
        { model: DrIdDeliveryDetail, include: DrIdItem },
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
    const delivery = await DrIdDelivery.findByPk(id, {
      include: DrIdDeliveryDetail,
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
