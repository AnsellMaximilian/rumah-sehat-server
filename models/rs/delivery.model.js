const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Delivery", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
};
