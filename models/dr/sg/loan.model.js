const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("DrSgLoan", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    lendType: {
      type: DataTypes.STRING,
      defaultValue: "lend",
      validate: {
        isIn: [["lend", "borrow"]],
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
    isReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    datePretty: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date).format("DD MMM YYYY");
      },
    },
    transactionValue: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.lendType === "lend" ? -this.qty : this.qty;
      },
    },
    returnedValue: {
      type: DataTypes.VIRTUAL,
      get() {
        return -this.transactionValue;
      },
    },
    stockValue: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!!this.returnDate) return 0;
        return this.transactionValue;
      },
    },
  });
};
