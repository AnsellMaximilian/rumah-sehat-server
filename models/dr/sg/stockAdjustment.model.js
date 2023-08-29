const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrSgStockAdjustment", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(7, 3),
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
