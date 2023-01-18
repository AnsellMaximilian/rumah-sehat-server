const { Sequelize } = require("sequelize");

const modelDefiners = [
  require("./customer.model"),

  // Rumah Sehat
  require("./rs/product.model"),
  require("./rs/supplier.model"),
  require("./rs/productCategory.model"),
  require("./rs/deliveryType.model"),
  require("./rs/delivery.model"),
  require("./rs/deliveryDetail.model"),

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
  // Rumah Sehat
  Supplier,
  Product,
  ProductCategory,
  Delivery,
  DeliveryType,
  DeliveryDetail,

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

// RUMAH SEHAT
Supplier.hasMany(Product);
ProductCategory.hasMany(Product);
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
DeliveryType.hasMany(Delivery);

Delivery.hasMany(DeliveryDetail);
Product.hasMany(DeliveryDetail);
DeliveryDetail.belongsTo(Product);
Delivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

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
