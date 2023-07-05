const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrInvoice", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
    recipient: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },
    customerFullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },
    hasHemat: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.DrIdDeliveries) {
          return !!this.DrIdDeliveries?.some((d) =>
            d.DrIdDeliveryDetails?.some((dd) => dd.free)
          );
        }
        return false;
      },
    },
    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          (this.DrIdDeliveries
            ? this.DrIdDeliveries.reduce(
                (total, delivery) => total + delivery.totalPriceRP,
                0
              )
            : 0) +
          (this.DrSgDeliveries
            ? this.DrSgDeliveries.reduce(
                (total, delivery) => total + delivery.totalPriceRP,
                0
              )
            : 0) +
          (this.DrMyDeliveries
            ? this.DrMyDeliveries.reduce(
                (total, delivery) => total + delivery.totalPriceRP,
                0
              )
            : 0)
        );
      },
    },
  });
};
