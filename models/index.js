const { Sequelize } = require("sequelize");

const modelDefiners = [
  require("./customer.model"),
  require("./region.model"),
  require("./expense.model"),
  require("./expenseDetail.model"),
  require("./expenditure.model"),
  require("./transaction.model"),

  // Rumah Sehat
  require("./rs/product.model"),
  require("./rs/stockAdjustment.model"),
  require("./rs/draw.model"),
  require("./rs/supplier.model"),
  require("./rs/productCategory.model"),
  require("./rs/deliveryType.model"),
  require("./rs/delivery.model"),
  require("./rs/deliveryDetail.model"),
  require("./rs/purchase.model"),
  require("./rs/purchaseDetail.model"),
  require("./rs/purchaseInvoice.model"),
  require("./rs/invoice.model"),
  require("./rs/adjustment.model"),
  require("./rs/purchaseAdjustment.model"),
  require("./rs/deliveryExpense.model"),
  require("./rs/deliveryExpenseDetail.model"),

  // DR's Secret
  require("./dr/discountModel.model"),
  require("./dr/invoice.model"),
  require("./dr/id/delivery.model"),
  require("./dr/sg/delivery.model"),
  require("./dr/my/delivery.model"),
  require("./dr/id/item.model"),
  require("./dr/sg/item.model"),
  require("./dr/my/item.model"),
  require("./dr/id/deliveryDetail.model"),
  require("./dr/sg/deliveryDetail.model"),
  require("./dr/my/deliveryDetail.model"),
  require("./dr/id/stockAdjustment.model"),
  require("./dr/id/loan.model"),
  require("./dr/sg/stockAdjustment.model"),
  require("./dr/sg/loan.model"),
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
  Transaction,
  // Rumah Sehat
  Supplier,
  Product,
  StockAdjustment,
  Draw,
  ProductCategory,
  Delivery,
  DeliveryType,
  DeliveryDetail,
  Invoice,
  Purchase,
  PurchaseDetail,
  PurchaseInvoice,
  PurchaseAdjustment,
  Adjustment,
  Expense,
  Expenditure,
  ExpenseDetail,
  DeliveryExpense,
  DeliveryExpenseDetail,
  // DR's
  DrIdDelivery,
  DrSgDelivery,
  DrMyDelivery,
  DrIdItem,
  DrSgItem,
  DrMyItem,
  DrDiscountModel,
  DrIdDeliveryDetail,
  DrSgDeliveryDetail,
  DrMyDeliveryDetail,
  DrInvoice,
  DrIdStockAdjustment,
  DrIdLoan,
  DrSgStockAdjustment,
  DrSgLoan,
} = sequelize.models;

Region.hasMany(Customer);
Customer.belongsTo(Region);

// LOANS ID
DrIdLoan.belongsTo(Customer);
DrIdLoan.belongsTo(DrIdItem, {
  foreignKey: {
    allowNull: false,
  },
});
Customer.hasMany(DrIdLoan, {
  onDelete: "SET NULL",
});
DrIdItem.hasMany(DrIdLoan, {
  onDelete: "CASCADE",
});

// LOANS SG
Customer.hasMany(DrSgLoan, {
  onDelete: "SET NULL",
});
DrSgItem.hasMany(DrSgLoan, {
  onDelete: "CASCADE",
});
DrSgLoan.belongsTo(Customer);
DrSgLoan.belongsTo(DrSgItem, {
  foreignKey: {
    allowNull: false,
  },
});

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

DeliveryDetail.belongsTo(Delivery, {
  foreignKey: {
    allowNull: false,
  },
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

Purchase.belongsTo(PurchaseInvoice, {
  foreignKey: {
    allowNull: true,
  },
});

PurchaseInvoice.hasMany(Purchase, {
  onDelete: "SET NULL",
});

Supplier.hasMany(PurchaseInvoice, {
  foreignKey: {
    allowNull: false,
  },
});

PurchaseInvoice.belongsTo(Supplier, {
  onDelete: "CASCADE",
});

Customer.hasMany(PurchaseDetail);

PurchaseDetail.belongsTo(Customer);

PurchaseDetail.hasOne(DeliveryDetail, {
  foreignKey: {
    allowNull: true,
  },
});

DeliveryDetail.belongsTo(PurchaseDetail, {
  onDelete: "SET NULL",
});

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

Adjustment.belongsTo(Invoice, { as: "SourceInvoice" });
Adjustment.belongsTo(Invoice, { as: "AdjustedInvoice" });
Adjustment.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});
Customer.hasMany(Adjustment, {
  onDelete: "CASCADE",
});
Invoice.hasMany(Adjustment, {
  onDelete: "CASCADE",
  as: "SourcedInvoiceAdjustments",
  foreignKey: "SourceInvoiceId",
});

Invoice.hasMany(Adjustment, {
  onDelete: "CASCADE",
  as: "InvoiceAdjustments",
  foreignKey: "AdjustedInvoiceId",
});

PurchaseAdjustment.belongsTo(Purchase, { as: "SourcePurchase" });
PurchaseAdjustment.belongsTo(Adjustment);
PurchaseAdjustment.belongsTo(Supplier);
Adjustment.hasOne(PurchaseAdjustment);
Purchase.hasMany(PurchaseAdjustment, {
  as: "SourcedPurchaseAdjustments",
  foreignKey: "SourcePurchaseId",
});
Supplier.hasMany(PurchaseAdjustment);

//

PurchaseAdjustment.belongsTo(PurchaseInvoice, {
  as: "AdjustedPurchaseInvoice",
});
PurchaseInvoice.hasMany(PurchaseAdjustment, {
  onDelete: "CASCADE",
  as: "PurchaseInvoiceAdjustments",
  foreignKey: "AdjustedPurchaseInvoiceId",
});

Transaction.belongsTo(PurchaseInvoice, {
  foreignKey: {
    allowNull: true,
  },
});

PurchaseInvoice.hasMany(Transaction, {
  onDelete: "SET NULL",
});

// DR's
DrInvoice.belongsTo(DrDiscountModel);
DrDiscountModel.hasMany(DrInvoice);

DrIdDelivery.belongsTo(DrDiscountModel);
DrSgDelivery.belongsTo(DrDiscountModel);
DrMyDelivery.belongsTo(DrDiscountModel);

DrDiscountModel.hasMany(DrIdDelivery);
DrDiscountModel.hasMany(DrSgDelivery);
DrDiscountModel.hasMany(DrMyDelivery);

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

DrMyDelivery.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

DrInvoice.belongsTo(Customer, {
  foreignKey: {
    allowNull: false,
  },
});

Customer.hasMany(DrInvoice);
Customer.hasMany(DrIdDelivery);
Customer.hasMany(DrSgDelivery);
Customer.hasMany(DrMyDelivery);

DrIdItem.hasMany(DrIdDeliveryDetail);
DrSgItem.hasMany(DrSgDeliveryDetail);
DrMyItem.hasMany(DrMyDeliveryDetail);

DrIdDeliveryDetail.belongsTo(DrIdItem);
DrSgDeliveryDetail.belongsTo(DrSgItem);
DrMyDeliveryDetail.belongsTo(DrMyItem);

DrIdDelivery.hasMany(DrIdDeliveryDetail, {
  onDelete: "CASCADE",
});
DrIdDeliveryDetail.belongsTo(DrIdDelivery, {
  foreignKey: {
    allowNull: false,
  },
});
DrSgDelivery.hasMany(DrSgDeliveryDetail, {
  onDelete: "CASCADE",
});
DrSgDeliveryDetail.belongsTo(DrSgDelivery, {
  foreignKey: {
    allowNull: false,
  },
});

DrMyDelivery.hasMany(DrMyDeliveryDetail, {
  onDelete: "CASCADE",
});

DrIdDelivery.belongsTo(DrInvoice);
DrSgDelivery.belongsTo(DrInvoice);
DrMyDelivery.belongsTo(DrInvoice);

// Stock Adjustments
DrIdItem.hasMany(DrIdStockAdjustment, {
  onDelete: "CASCADE",
});

DrIdStockAdjustment.belongsTo(DrIdItem, {
  foreignKey: {
    allowNull: false,
  },
});

DrSgItem.hasMany(DrSgStockAdjustment, {
  onDelete: "CASCADE",
});

DrSgStockAdjustment.belongsTo(DrSgItem, {
  foreignKey: {
    allowNull: false,
  },
});

// RUMAH SEHAT

DrInvoice.hasMany(DrIdDelivery, {
  onDelete: "CASCADE",
});
DrInvoice.hasMany(DrSgDelivery, {
  onDelete: "CASCADE",
});
DrInvoice.hasMany(DrMyDelivery, {
  onDelete: "CASCADE",
});

// EXPENSES
Expense.hasMany(Expenditure, {
  onDelete: "SET NULL",
});

Expenditure.belongsTo(Expense, {
  foreignKey: {
    allowNull: false,
  },
});

Expenditure.belongsTo(Delivery, {
  foreignKey: {
    allowNull: true,
  },
});

// DELIVERY EXPENSE (FOR ACCURATE COSTS)
Expense.hasMany(DeliveryExpense, {
  onDelete: "SET NULL",
});

DeliveryExpense.belongsTo(Expense, {
  foreignKey: {
    allowNull: false,
  },
});

DeliveryExpense.hasMany(DeliveryExpenseDetail, {
  onDelete: "SET NULL",
});

DeliveryExpenseDetail.belongsTo(DeliveryExpense, {
  foreignKey: {
    allowNull: true,
  },
});

DeliveryDetail.hasMany(DeliveryExpenseDetail, {
  onDelete: "SET NULL",
});

DeliveryExpenseDetail.belongsTo(DeliveryDetail, {
  foreignKey: {
    allowNull: true,
  },
});

// DRAW

Product.hasMany(Draw, {
  onDelete: "SET NULL",
});

Draw.belongsTo(Product, {
  foreignKey: {
    allowNull: false,
  },
});

// Stock Adjustments
Product.hasMany(StockAdjustment, {
  onDelete: "CASCADE",
});

StockAdjustment.belongsTo(Product, {
  foreignKey: {
    allowNull: false,
  },
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Successfully synced database");
  })
  .catch(() => {
    console.log("Error occured while syncing database");
  });

exports.sequelize = sequelize;
