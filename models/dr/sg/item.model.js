const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrSgItem", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    weight: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 0,
    },
    priceSGD: {
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
    deliveryCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    recommendedDeliveryCost: {
      type: DataTypes.VIRTUAL,
      get() {
        return 200000 / (750 / this.weight);
      },
    },
    keepStockSince: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
  });
};
