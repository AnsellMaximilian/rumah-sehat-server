const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Delivery", {
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
    customerFullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },
    subtotalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DeliveryDetails
          ? this.DeliveryDetails.reduce(
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
  });
};
