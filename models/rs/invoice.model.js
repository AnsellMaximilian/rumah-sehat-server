const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("Invoice", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customerFullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },

    datePretty: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date).format("DD MMM YYYY");
      },
    },

    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Deliveries
          ? this.Deliveries.reduce(
              (total, delivery) => total + delivery.totalPrice,
              0
            )
          : 0;
      },
    },
  });
};
