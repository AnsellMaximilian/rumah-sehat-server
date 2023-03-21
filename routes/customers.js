const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      Customer,
      DrIdDelivery,
      DrSgDelivery,
      DrIdDeliveryDetail,
      DrSgDeliveryDetail,
      DrIdItem,
      DrSgItem,
      Invoice,
      DrDiscountModel,
      Region,
      PurchaseDetail,
      Adjustment,
    },
  },
} = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({ include: [Region, Invoice] });
    res.json({ data: customers });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      fullName,
      address,
      phone,
      rsMember,
      RegionId,
      receiveDrDiscount,
      note,
    } = req.body;

    const newCustomer = Customer.build({
      fullName,
      address,
      phone,
      rsMember,
      RegionId,
      note,
      receiveDrDiscount,
    });
    await newCustomer.save();

    res.json({ message: "Success", data: newCustomer });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [{ model: Region }, { model: Adjustment }],
    });
    if (!customer) throw `Can't find item with id ${id}`;
    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id/designated-sales", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exclude } = req.query;
    const customer = await Customer.findByPk(id, {
      include: [
        {
          model: PurchaseDetail,
          where: exclude
            ? {
                id: {
                  [Op.notIn]: exclude.split(","),
                },
              }
            : {},
        },
      ],
    });
    if (customer === null) throw "No more available designated sales.";
    if (!customer) throw `Can't find item with id ${id}`;
    res.json({ data: customer.PurchaseDetails });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {
      fullName,
      address,
      phone,
      rsMember,
      RegionId,
      receiveDrDiscount,
      note,
    } = req.body;
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    await customer.update(
      { fullName, address, phone, rsMember, RegionId, receiveDrDiscount, note },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    await customer.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: customer });
  } catch (error) {
    res.json({ error });
  }
});

// DR SECRET
router.get("/:id/dr/id/deliveries", async (req, res) => {
  try {
    const { id } = req.params;

    const deliveries = await DrIdDelivery.findAll({
      where: { CustomerId: id },

      include: [
        { model: DrIdDeliveryDetail, include: DrIdItem },
        { model: Customer },
        { model: DrDiscountModel },
      ],
    });
    res.json({ data: deliveries });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id/dr/sg/deliveries", async (req, res) => {
  try {
    const { id } = req.params;

    const deliveries = await DrSgDelivery.findAll({
      where: { CustomerId: id },

      include: [
        { model: DrSgDeliveryDetail, include: DrSgItem },
        { model: Customer },
        { model: DrDiscountModel },
      ],
    });
    res.json({ data: deliveries });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
