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
              (total, detail) => total + detail.totalPriceRP,
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
        // presence of relationship or discount indicated by foreign key
        // return this.DrDiscountModel;
        if (this.DrDiscountModelId) {
          return (
            (this.subtotalPoints - this.DrDiscountModel.subtractor) *
            this.DrDiscountModel.base *
            (this.DrDiscountModel.percentage / 100)
          );
        }
        return 0;
      },
    },
    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalPriceRP + this.cost - this.totalDiscount;
      },
    },
  });
};
