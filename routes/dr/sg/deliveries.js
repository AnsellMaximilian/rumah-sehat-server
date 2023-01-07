const router = require("express").Router();
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

router.get("/", async (req, res) => {
  const { unInvoiced } = req.query;

  try {
    const deliveries = await DrSgDelivery.findAll({
      where:
        unInvoiced === "true"
          ? {
              DrInvoiceId: null,
            }
          : {},
      include: [DrSgDeliveryDetail, Customer, DrDiscountModel],
    });
    res.json({ data: deliveries });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
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
    const newDelivery = DrSgDelivery.build({
      date,
      cost,
      note,
      CustomerId,
      DrDiscountModelId,
      exchangeRate,
      deliveryCostType,
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
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
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
    res.json({ error });
  }
});

module.exports = router;
