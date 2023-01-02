const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdDelivery", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
