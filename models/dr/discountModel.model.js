const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrDiscountModel", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    subtractor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    base: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
