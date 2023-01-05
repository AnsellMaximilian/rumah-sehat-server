const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdDeliveryDetail", {
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
        return this.DrIdItem?.name;
      },
    },
    totalPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.priceRP * this.qty;
      },
    },
    totalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.points * this.qty;
      },
    },
  });
};
