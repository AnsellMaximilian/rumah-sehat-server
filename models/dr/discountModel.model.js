const { DataTypes } = require("sequelize");
const { rupiah } = require("../../helpers/formatCurrency");

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
    displayName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `#${this.id} (POINTS - ${this.subtractor}) x ${rupiah(
          this.base
        )} x ${this.percentage}%`;
      },
    },
  });
};
