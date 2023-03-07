const router = require("express").Router();
const path = require("path");

const {
  sequelize: {
    models: {
      Invoice,
      Delivery,
      DeliveryDetail,
      Customer,
      Product,
      DeliveryType,
      Purchase,
      PurchaseDetail,
    },
  },
} = require("../../models/index");
const {
  createPDFStream,
  generateHTML,
} = require("../../helpers/pdfGeneration");

router.get("/", async (req, res, next) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Delivery, include: DeliveryDetail },
        { model: Customer },
      ],
    });
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { CustomerId, date, note, deliveries, status } = req.body;
    const newInvoice = Invoice.build({
      date,
      note,
      CustomerId,
      status,
    });
    await newInvoice.save();

    for (const deliveryData of deliveries) {
      const {
        mode,
        deliveryData: { date, cost, note, DeliveryTypeId, CustomerId },
        supplierDeliveryData: { cost: supplierCost, SupplierId },
        deliveryDetails,
      } = deliveryData;

      const delivery = Delivery.build({
        date,
        cost,
        note,
        DeliveryTypeId,
        CustomerId,
      });

      await delivery.save();

      for (const deliveryDetail of deliveryDetails) {
        const { price, qty, ProductId, makePurchase, cost, designatedSaleId } =
          deliveryDetail;

        let makedetail = true;

        if (designatedSaleId) {
          const designatedSale = await PurchaseDetail.findByPk(
            designatedSaleId
          );
          if (designatedSale && designatedSale.CustomerId !== null) {
            await designatedSale.update({
              CustomerId: null,
            });
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
          });
        }

        // Make purchase
        if (mode === "own") {
          if (makePurchase) {
            const newPurchase = Purchase.build({
              date,
              cost: 0,
              SupplierId: deliveryDetail.product.SupplierId,
            });
            await newPurchase.save();

            await newPurchase.createPurchaseDetail({
              price: cost,
              qty,
              ProductId,
            });
          }
        }
      }

      await newInvoice.addDelivery(delivery);

      // Purchases

      if (mode === "supplier") {
        const newPurchase = Purchase.build({
          date: date,
          cost: supplierCost,
          SupplierId,
          DeliveryId: delivery.id,
        });

        await newPurchase.save();

        for (const purchaseDetail of deliveryDetails) {
          const { cost, qty, ProductId, makePurchase } = purchaseDetail;

          await newPurchase.createPurchaseDetail({
            price: cost,
            qty,
            ProductId,
          });
        }
      }
    }

    res.json({ message: "Success", data: newInvoice });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { CustomerId, date, note, deliveries, status } = req.body;

    const { id } = req.params;

    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Delivery,
          include: [
            { model: DeliveryType },
            { model: DeliveryDetail, include: Product },
          ],
        },
        { model: Customer },
      ],
    });

    await invoice.update(
      {
        date,
        note,
        CustomerId,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );

    // Delete deliveries
    await Delivery.destroy({
      where: {
        InvoiceId: invoice.id,
      },
    });

    // replace deliveries
    for (const deliveryData of deliveries) {
      const {
        mode,
        editId,
        deliveryData: { date, cost, note, DeliveryTypeId, CustomerId },
        supplierDeliveryData: { cost: supplierCost, SupplierId },
        deliveryDetails,
      } = deliveryData;

      const delivery = Delivery.build({
        date,
        cost,
        note,
        DeliveryTypeId,
        CustomerId,
      });

      await delivery.save();

      for (const deliveryDetail of deliveryDetails) {
        const {
          price,
          qty,
          ProductId,
          makePurchase,
          cost,
          editId: detailEditId,
          designatedSaleId,
        } = deliveryDetail;

        let makedetail = true;

        if (designatedSaleId) {
          const designatedSale = await PurchaseDetail.findByPk(
            designatedSaleId
          );
          if (designatedSale && designatedSale.CustomerId !== null) {
            await designatedSale.update({
              CustomerId: null,
            });
          } else {
            // designatedSale id is sent but it doesn't exist, or it does but no longer has a designated recipient
            makedetail = false;
          }
        }

        if (makedetail) {
          await delivery.createDeliveryDetail({
            price,
            cost,
            qty,
            ProductId,
          });
        }

        // Make purchase
        if (mode === "own") {
          if (makePurchase && (!editId || (editId && !detailEditId))) {
            const newPurchase = Purchase.build({
              date,
              cost: 0,
              SupplierId: deliveryDetail.product.SupplierId,
            });
            await newPurchase.save();

            await newPurchase.createPurchaseDetail({
              price: cost,
              qty,
              ProductId,
            });
          }
        }
      }

      await invoice.addDelivery(delivery);

      // Purchases

      if (mode === "supplier" && !editId) {
        const newPurchase = Purchase.build({
          date: date,
          cost: supplierCost,
          SupplierId,
          DeliveryId: delivery.id,
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
    }

    res.json({ data: invoice });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Delivery,
          include: [
            { model: DeliveryDetail, include: Product },
            { model: Customer },
            { model: DeliveryType },
          ],
        },
        { model: Customer },
      ],
    });
    if (!invoice) throw `Can't find invoice with id ${id}`;
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id);
    if (invoice.status !== "draft")
      throw `Can't delete: This invoice is ${invoice.status}. Make sure invoice status is 'draft'.`;
    await invoice.destroy({
      where: {
        id: id,
      },
    });
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/print", async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Customer,
        },
        {
          model: Delivery,
          include: [
            { model: DeliveryDetail, include: Product },
            { model: Customer },
            { model: DeliveryType },
          ],
        },
      ],
    });
    if (!invoice) throw `Can't find item with id ${id}`;

    const invoiceJSON = invoice.toJSON();

    const pdfStream = await createPDFStream(
      path.join(__dirname, "..", "..", "templates", "rs-invoice2.hbs"),
      {
        invoice: {
          ...invoiceJSON,
        },
      }
    );

    pdfStream.pipe(res);

    // const html = generateHTML(
    //   path.join(__dirname, "..", "..", "templates", "rs-invoice2.hbs"),
    //   {
    //     invoice: {
    //       ...invoiceJSON,
    //     },
    //   }
    // );
    // res.end(html);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
