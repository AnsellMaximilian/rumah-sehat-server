const { Sequelize } = require("sequelize");

const modelDefiners = [
  require("./customer.model"),
  require("./dr/discountModel.model"),
  require("./dr/invoice.model"),
  require("./dr/id/delivery.model"),
  require("./dr/id/item.model"),
  require("./dr/sg/item.model"),
  require("./dr/id/deliveryDetail.model"),
];

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Setup associations
const {
  DrIdDelivery,
  DrIdItem,
  Customer,
  DrDiscountModel,
  DrIdDeliveryDetail,
  DrInvoice,
} = sequelize.models;
DrIdDelivery.belongsTo(DrDiscountModel);
DrDiscountModel.hasMany(DrIdDelivery);
DrIdDelivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});
DrIdItem.hasMany(DrIdDeliveryDetail);
DrIdDeliveryDetail.belongsTo(DrIdItem);
DrIdDelivery.hasMany(DrIdDeliveryDetail);
DrIdDelivery.belongsTo(DrInvoice);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Successfully synced database");
  })
  .catch(() => {
    console.log("Error occured while syncing database");
  });

exports.sequelize = sequelize;
