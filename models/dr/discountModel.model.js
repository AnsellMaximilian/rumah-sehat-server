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
      validate: {
        min: 0,
      },
    },
    base: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
};
