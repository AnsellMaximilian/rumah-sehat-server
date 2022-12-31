const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdDeliveryDetail", {
    priceRP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
