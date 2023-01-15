const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrSgDelivery", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deliveryCostType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "individual",
      validate: {
        isIn: [["individual", "whole"]],
      },
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exchangeRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subtotalPriceSGD: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrSgDeliveryDetails
          ? this.DrSgDeliveryDetails.reduce(
              (total, detail) => total + detail.totalPriceSGD,
              0
            )
          : 0;
      },
    },
    subtotalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrSgDeliveryDetails
          ? this.DrSgDeliveryDetails.reduce(
              (total, detail) => total + detail.totalPoints,
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
    totalDiscount: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.DrDiscountModel) {
          return (
            (this.subtotalPoints - this.DrDiscountModel.subtractor) *
            this.DrDiscountModel.base *
            (this.DrDiscountModel.percentage / 100)
          );
        }
        return 0;
      },
    },

    isDeliveryCostIndividual: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.deliveryCostType === "individual";
      },
    },
    totalDeliveryCost: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.deliveryCostType === "individual"
          ? this.DrSgDeliveryDetails
            ? this.DrSgDeliveryDetails.reduce(
                (total, detail) => total + detail.totalDeliveryCost,
                0
              )
            : 0
          : 0;
      },
    },
    subtotalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPriceSGD * this.exchangeRate;
      },
    },
    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          this.subtotalPriceRP +
          this.cost -
          this.totalDiscount +
          this.totalDeliveryCost
        );
      },
    },
  });
};
