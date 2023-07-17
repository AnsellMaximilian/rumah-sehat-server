const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdDelivery", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subtotalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrIdDeliveryDetails
          ? this.DrIdDeliveryDetails.reduce(
              (total, detail) => total + detail.totalCountedPriceRP,
              0
            )
          : 0;
      },
    },
    subtotalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrIdDeliveryDetails
          ? this.DrIdDeliveryDetails.reduce(
              (total, detail) => total + detail.totalCountedPoints,
              0
            )
          : 0;
      },
    },
    customerFullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },
    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPriceRP + this.cost;
      },
    },
    getChargedDetails: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrIdDeliveryDetails
          ? this.DrIdDeliveryDetails.filter((dd) => !dd.free)
          : [];
      },
    },
    getFreeDetails: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrIdDeliveryDetails
          ? this.DrIdDeliveryDetails.filter((dd) => dd.free)
          : [];
      },
    },
  });
};
