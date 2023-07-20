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

    subtotalWeight: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrSgDeliveryDetails
          ? this.DrSgDeliveryDetails.reduce(
              (total, detail) => total + detail.totalWeight,
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
    subtotalPriceRPAndDeliveryCost: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPriceRP + this.totalDeliveryCost;
      },
    },

    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPriceRP + this.cost + this.totalDeliveryCost;
      },
    },
  });
};
