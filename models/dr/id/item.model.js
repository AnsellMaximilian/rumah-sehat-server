const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceRP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
