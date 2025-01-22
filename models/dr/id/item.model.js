const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    priceRP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    keepStockSince: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
