const router = require("express").Router();
const { Op } = require("sequelize");
const {
  sequelize: {
    models: {
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Invoice,
      PurchaseDetail,
      Purchase,
    },
  },
} = require("../../models/index");

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
      whereClause.InvoiceId = null;
    }

    const deliveries = await Delivery.findAll({
      where: whereClause,
      include: [
        DeliveryDetail,
        Customer,
        DeliveryType,
        {
          model: Invoice,
          include: [Customer, { model: Delivery, include: DeliveryDetail }],
        },
        Purchase,
      ],
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
      DeliveryTypeId,
      InvoiceId,
      mode,
      SupplierId,
      supplierCost,
    } = req.body;

    let newPurchase;

    // Purchases
    if (mode === "supplier") {
      newPurchase = Purchase.build({
        date: date,
        cost: supplierCost,
        SupplierId,
      });

      await newPurchase.save();

      for (const purchaseDetail of deliveryDetails) {
        const { cost, qty, ProductId } = purchaseDetail;

        await newPurchase.createPurchaseDetail({
          price: cost,
          qty,
          ProductId,
        });
      }
    }

    const invoice = await Invoice.findByPk(InvoiceId);
    const newDelivery = Delivery.build({
      date,
      cost,
      note,
      CustomerId,
      DeliveryTypeId,
      InvoiceId,
      PurchaseId: newPurchase && mode === "supplier" ? newPurchase.id : null,
    });

    await newDelivery.save();

    for (const deliveryDetail of deliveryDetails) {
      const { price, qty, ProductId, cost, designatedSaleId } = deliveryDetail;

      let makedetail = true;
      let designatedPurchaseDetail = null;

      if (designatedSaleId) {
        const designatedSale = await PurchaseDetail.findByPk(designatedSaleId);
        if (designatedSale && designatedSale.CustomerId !== null) {
          await designatedSale.update({
            CustomerId: null,
          });
          designatedPurchaseDetail = designatedSale;
        } else {
          // designatedSale id is sent but it doesn't exist, or it does but no longer has a designated recipient
          makedetail = false;
        }
      }

      if (makedetail) {
        await newDelivery.createDeliveryDetail({
          price,
          qty,
          ProductId,
          cost,
          PurchaseDetailId: designatedPurchaseDetail
            ? designatedPurchaseDetail.id
            : null,
        });
      }
    }

    await invoice.addDelivery(newDelivery);

    res.json({ message: "Success", data: newDelivery });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/switch-invoice", async (req, res, next) => {
  try {
    const { InvoiceId } = req.body;

    const { id } = req.params;

    const invoice = await Invoice.findByPk(InvoiceId);

    if (invoice) {
      await Delivery.update(
        {
          InvoiceId,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      throw new Error("Invoice doesn't exist.");
    }

    res.json({ data: true });
  } catch (error) {
    console.log(error);
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
      DeliveryTypeId,
      InvoiceId,
      mode,
      SupplierId,
      supplierCost,
      editId,
    } = req.body;

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        { model: DeliveryDetail, include: Product },
        { model: Customer },
        { model: DeliveryType },
      ],
    });

    await delivery.update(
      { date, cost, note, CustomerId, DeliveryTypeId },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete delivery details
    await DeliveryDetail.destroy({
      where: {
        DeliveryId: delivery.id,
      },
    });

    for (const deliveryDetail of deliveryDetails) {
      const {
        price,
        qty,
        ProductId,
        cost,
        designatedSaleId,
        PurchaseDetailId,
      } = deliveryDetail;

      let makedetail = true;
      let designatedPurchaseDetail = null;

      if (designatedSaleId) {
        const designatedSale = await PurchaseDetail.findByPk(designatedSaleId);
        if (designatedSale && designatedSale.CustomerId !== null) {
          await designatedSale.update({
            CustomerId: null,
          });
          designatedPurchaseDetail = designatedSale;
        } else {
          // designatedSale id is sent but it doesn't exist, or it does but no longer has a designated recipient
          makedetail = false;
        }
      }

      if (makedetail) {
        await delivery.createDeliveryDetail({
          price,
          qty,
          ProductId,
          cost,
          PurchaseDetailId: designatedPurchaseDetail
            ? designatedPurchaseDetail.id
            : PurchaseDetailId
            ? PurchaseDetailId
            : null,
        });
      }
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
    const delivery = await Delivery.findByPk(id, {
      include: [
        { model: DeliveryDetail, include: Product },
        { model: Customer },
        { model: DeliveryType },
        {
          model: Invoice,
          include: [Customer, { model: Delivery, include: DeliveryDetail }],
        },
        { model: Purchase },
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
    const delivery = await Delivery.findByPk(id, {
      include: [DeliveryDetail],
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
