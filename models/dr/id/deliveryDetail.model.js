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
    totalCountedPriceRP: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.free) return 0;
        return this.totalPriceRP;
      },
    },

    totalPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.points * this.qty;
      },
    },
    totalCountedPoints: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.free) return 0;

        return this.points * this.qty;
      },
    },
    free: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isCharged: {
      type: DataTypes.VIRTUAL,
      get() {
        return !this.free;
      },
    },
  });
};
