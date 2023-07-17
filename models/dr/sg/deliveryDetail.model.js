const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrSgDeliveryDetail", {
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
    weight: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    deliveryCost: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    itemName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.DrSgItem?.name;
      },
    },
    totalPriceSGD: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.priceSGD * this.qty;
      },
    },
    totalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.points * this.qty;
      },
    },
    totalWeight: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.weight * this.qty;
      },
    },
    totalDeliveryCost: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.deliveryCost ? this.deliveryCost * this.qty : 0;
      },
    },
  });
};
