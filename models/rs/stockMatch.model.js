const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("StockMatch", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: 1,
      },
    },
    qty: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
