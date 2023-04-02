const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrMyDeliveryDetail", {
    priceRM: {
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
        return this.DrMyItem?.name;
      },
    },
    totalPriceRM: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.priceRM * this.qty;
      },
    },
    totalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.points * this.qty;
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
