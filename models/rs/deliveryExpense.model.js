const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("DeliveryExpense", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    qty: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    unit: {
      type: DataTypes.STRING,
      defaultValue: "Satuan",
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    totalAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.qty * this.amount;
      },
    },
  });
};
