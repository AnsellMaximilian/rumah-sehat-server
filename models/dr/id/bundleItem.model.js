const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrIdBundleItem", {
    qty: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
};
