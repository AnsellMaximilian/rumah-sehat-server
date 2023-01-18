const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DeliveryType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    defaultCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });
};
