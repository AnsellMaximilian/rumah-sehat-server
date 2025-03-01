const { DataTypes } = require("sequelize");
const moment = require("moment");
const { TRANSACTIONS } = require("../const");

module.exports = (sequelize) => {
  sequelize.define("Transaction", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      default: TRANSACTIONS.ANSELL,
    },
    datePretty: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date).format("DD MMM YYYY");
      },
    },
    type: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.amount < 0 ? "OUTGOING" : "INCOMING";
      },
    },
  });
};
