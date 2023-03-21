const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Adjustment", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
