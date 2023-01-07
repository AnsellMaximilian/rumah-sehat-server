const router = require("express").Router();
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

router.get("/", async (req, res) => {
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
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
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
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
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
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { name, priceRP, points } = req.body;
    const { id } = req.params;

    const delivery = await DrIdDelivery.findByPk(id);

    await delivery.update(
      { name, priceRP, points },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: delivery });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DrIdDelivery.findByPk(id);
    await delivery.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: delivery });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
