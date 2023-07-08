const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("StockAdjustment", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flow: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.amount < 0 ? "OUT" : "IN";
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};