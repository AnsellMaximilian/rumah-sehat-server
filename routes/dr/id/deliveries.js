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
  const { unInvoiced } = req.query;
  try {
    const deliveries = await DrIdDelivery.findAll({
      where:
        unInvoiced === "true"
          ? {
              DrInvoiceId: null,
            }
          : {},
      include: [DrIdDeliveryDetail, Customer, DrDiscountModel],
    });
    res.json({ data: deliveries });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date, cost, note, deliveryDetails, CustomerId, DrDiscountModelId } =
      req.body;
    const newDelivery = DrIdDelivery.build({
      date,
      cost,
      note,
      CustomerId,
      DrDiscountModelId,
    });
    await newDelivery.save();

    for (const deliveryDetail of deliveryDetails) {
      const { priceRP, qty, points, DrIdItemId } = deliveryDetail;
      console.log({ priceRP, qty, points, DrIdItemId });

      await newDelivery.createDrIdDeliveryDetail({
        priceRP,
        qty,
        points,
        DrIdItemId,
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
      const { priceRP, qty, points, DrIdItemId } = deliveryDetail;

      await delivery.createDrIdDeliveryDetail({
        priceRP,
        qty,
        points,
        DrIdItemId,
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
    if (delivery.DrIdDeliveryDetails.length > 0)
      throw "Can't delete: This delivery is not empty.";
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
