const { Sequelize } = require("sequelize");

const modelDefiners = [
  require("./customer.model"),
  require("./region.model"),

  // Rumah Sehat
  require("./rs/product.model"),
  require("./rs/supplier.model"),
  require("./rs/productCategory.model"),
  require("./rs/deliveryType.model"),
  require("./rs/delivery.model"),
  require("./rs/deliveryDetail.model"),
  require("./rs/purchase.model"),
  require("./rs/purchaseDetail.model"),
  require("./rs/invoice.model"),

  // DR's Secret
  require("./dr/discountModel.model"),
  require("./dr/invoice.model"),
  require("./dr/id/delivery.model"),
  require("./dr/sg/delivery.model"),
  require("./dr/id/item.model"),
  require("./dr/sg/item.model"),
  require("./dr/id/deliveryDetail.model"),
  require("./dr/sg/deliveryDetail.model"),
];

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Setup associations
const {
  Customer,
  Region,
  // Rumah Sehat
  Supplier,
  Product,
  ProductCategory,
  Delivery,
  DeliveryType,
  DeliveryDetail,
  Invoice,
  Purchase,
  PurchaseDetail,

  // DR's
  DrIdDelivery,
  DrSgDelivery,
  DrIdItem,
  DrSgItem,
  DrDiscountModel,
  DrIdDeliveryDetail,
  DrSgDeliveryDetail,
  DrInvoice,
} = sequelize.models;

Region.hasMany(Customer);
Customer.belongsTo(Region);

// RUMAH SEHAT
Supplier.hasMany(Product, {
  onDelete: "SET NULL",
});
ProductCategory.hasMany(Product, {
  onDelete: "SET NULL",
});
Product.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
Product.belongsTo(ProductCategory, {
  foreignKey: {
    allowNull: false,
  },
});

Delivery.belongsTo(DeliveryType);
DeliveryType.hasMany(Delivery, {
  onDelete: "SET NULL",
});

Delivery.hasMany(DeliveryDetail, {
  onDelete: "CASCADE",
});
Product.hasMany(DeliveryDetail, {
  onDelete: "SET NULL",
});
DeliveryDetail.belongsTo(Product, {
  foreignKey: {
    allowNull: false,
  },
});
Delivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

Delivery.belongsTo(Purchase);
Purchase.hasOne(Delivery, {
  onDelete: "SET NULL",
});

Purchase.hasMany(PurchaseDetail, {
  onDelete: "CASCADE",
});

PurchaseDetail.belongsTo(Purchase);
Product.hasMany(PurchaseDetail);
PurchaseDetail.belongsTo(Product, {
  foreignKey: {
    allowNull: false,
  },
});
Supplier.hasMany(Purchase);
Purchase.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});

Customer.hasMany(PurchaseDetail);

PurchaseDetail.belongsTo(Customer);

Invoice.hasMany(Delivery, {
  onDelete: "CASCADE",
});

Delivery.belongsTo(Invoice);
Invoice.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});
Customer.hasMany(Invoice);

// DR's
DrIdDelivery.belongsTo(DrDiscountModel);
DrSgDelivery.belongsTo(DrDiscountModel);

DrDiscountModel.hasMany(DrIdDelivery);
DrDiscountModel.hasMany(DrSgDelivery);

DrIdDelivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});
DrSgDelivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

DrInvoice.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

DrIdItem.hasMany(DrIdDeliveryDetail);
DrSgItem.hasMany(DrSgDeliveryDetail);

DrIdDeliveryDetail.belongsTo(DrIdItem);
DrSgDeliveryDetail.belongsTo(DrSgItem);

DrIdDelivery.hasMany(DrIdDeliveryDetail);
DrSgDelivery.hasMany(DrSgDeliveryDetail);

DrIdDelivery.belongsTo(DrInvoice);
DrSgDelivery.belongsTo(DrInvoice);

DrInvoice.hasMany(DrIdDelivery);
DrInvoice.hasMany(DrSgDelivery);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Successfully synced database");
  })
  .catch(() => {
    console.log("Error occured while syncing database");
  });

exports.sequelize = sequelize;
