const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("Invoice", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft",
      validate: {
        isIn: [["draft", "pending", "paid"]],
      },
    },
    paid: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.status === "paid";
      },
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
        const adjustments = this.InvoiceAdjustments
          ? this.InvoiceAdjustments.reduce(
              (total, adj) => total + adj.amount,
              0
            )
          : 0;

        return (
          (this.Deliveries
            ? this.Deliveries.reduce(
                (total, delivery) => total + delivery.totalPrice,
                0
              )
            : 0) + adjustments
        );
      },
    },
  });
};
