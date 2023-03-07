const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("PurchaseDetail", {
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    qty: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    productName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Product?.name;
      },
    },
    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.price * this.qty;
      },
    },
    designatedRecipient: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer;
      },
    },
    toBeSold: {
      type: DataTypes.VIRTUAL,
      get() {
        return !!this.CustomerId;
      },
    },
  });
};
