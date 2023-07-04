const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Draw", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
};
