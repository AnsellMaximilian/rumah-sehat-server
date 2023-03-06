const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Purchase", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    supplierName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Supplier?.name;
      },
    },
    subtotalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.PurchaseDetails
          ? this.PurchaseDetails.reduce(
              (total, detail) => total + detail.totalPrice,
              0
            )
          : 0;
      },
    },
    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPrice + this.cost;
      },
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
