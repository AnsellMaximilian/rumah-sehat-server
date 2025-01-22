const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    resellerPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    unit: {
      type: DataTypes.STRING,
      defaultValue: "Satuan",
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    keepStockSince: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    restockNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    overallCost: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: true,
      default: 0,
      validate: {
        min: 0,
      },
    },
    getStockColors: {
      type: DataTypes.VIRTUAL,
      get() {
        const restockNum = this.restockNumber ? this.restockNumber : 0;
        return {
          red: restockNum,
          orange: Math.ceil(restockNum + restockNum * 0.1667),
          yellow: Math.ceil(restockNum + restockNum * 0.3333),
        };
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
