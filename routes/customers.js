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
      DrMyDelivery,
      DrMyDeliveryDetail,
      DrMyItem,
      DrIdItem,
      DrSgItem,
      Invoice,
      DrDiscountModel,
      Region,
      PurchaseDetail,
      Adjustment,
      DrInvoice,
    },
  },
} = require("../models/index");

router.get("/", async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      address,
      note,
      RegionId,
      withDrDetails,
      activeStatus,
    } = req.query;
    const whereClause = {};

    if (fullName) {
      whereClause.fullName = {
        [Op.iLike]: `%${fullName}%`,
      };
    }

    if (address) {
      whereClause.address = {
        [Op.iLike]: `%${address}%`,
      };
    }

    if (RegionId) {
      whereClause.RegionId = RegionId;
    }

    if (note) {
      whereClause.note = {
        [Op.iLike]: `%${note}%`,
      };
    }

    if (phone) {
      whereClause.phone = {
        [Op.iLike]: `%${phone}%`,
      };
    }

    if (!activeStatus) {
      whereClause.isActive = true;
    } else if (activeStatus !== "all")
      whereClause.isActive = activeStatus === "active";

    const drDetails = {};
    if (withDrDetails) {
      drDetails = {
        include: [
          { model: Customer },
          { model: DrDiscountModel },
          {
            model: DrIdDelivery,
            include: [
              { model: DrIdDeliveryDetail, include: DrIdItem },
              Customer,
              DrDiscountModel,
            ],
          },
          {
            model: DrSgDelivery,
            include: [
              { model: DrSgDeliveryDetail, include: DrSgItem },
              Customer,
              DrDiscountModel,
            ],
          },
          {
            model: DrMyDelivery,
            include: [
              { model: DrMyDeliveryDetail, include: DrMyItem },
              Customer,
              DrDiscountModel,
            ],
          },
        ],
      };
    }

    const customers = await Customer.findAll({
      include: [
        { model: Region },
        { model: Invoice },
        { model: DrInvoice, ...drDetails },
      ],
      where: whereClause,
    });
    res.json({ data: customers });
  } catch (error) {
    next(error);
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
      accountName,
      accountNumber,
    } = req.body;

    const newCustomer = Customer.build({
      fullName,
      address,
      phone,
      rsMember,
      RegionId,
      note,
      receiveDrDiscount,
      accountName,
      accountNumber,
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
      include: [
        { model: Region },
        { model: Adjustment },
        {
          model: DrInvoice,
          include: [
            { model: Customer },
            { model: DrDiscountModel },
            {
              model: DrIdDelivery,
              include: [
                { model: DrIdDeliveryDetail, include: DrIdItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrSgDelivery,
              include: [
                { model: DrSgDeliveryDetail, include: DrSgItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrMyDelivery,
              include: [
                { model: DrMyDeliveryDetail, include: DrMyItem },
                Customer,
                DrDiscountModel,
              ],
            },
          ],
        },
      ],
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

router.patch("/:id/cycle-active-status", async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [
        { model: Region },
        { model: Adjustment },
        {
          model: DrInvoice,
          include: [
            { model: Customer },
            { model: DrDiscountModel },
            {
              model: DrIdDelivery,
              include: [
                { model: DrIdDeliveryDetail, include: DrIdItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrSgDelivery,
              include: [
                { model: DrSgDeliveryDetail, include: DrSgItem },
                Customer,
                DrDiscountModel,
              ],
            },
            {
              model: DrMyDelivery,
              include: [
                { model: DrMyDeliveryDetail, include: DrMyItem },
                Customer,
                DrDiscountModel,
              ],
            },
          ],
        },
      ],
    });
    customer.update({
      isActive: !customer.isActive,
    });
    res.json({ data: customer });
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
      accountName,
      accountNumber,
    } = req.body;
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    await customer.update(
      {
        fullName,
        address,
        phone,
        rsMember,
        RegionId,
        receiveDrDiscount,
        note,
        accountName,
        accountNumber,
      },
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

router.delete("/:id", async (req, res, next) => {
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
    next(error);
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
