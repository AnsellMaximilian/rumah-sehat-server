const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("Expenditure", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deliveryCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    subtotalAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.ExpenseDetails
          ? this.ExpenseDetails.reduce(
              (total, detail) => total + detail.totalAmount,
              0
            )
          : 0;
      },
    },
    totalAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.subtotalAmount + this.deliveryCost;
      },
    },
    datePretty: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date).format("DD MMM YYYY");
      },
    },
  });
};
