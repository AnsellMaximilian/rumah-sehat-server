const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Customer", {
    // Model attributes are defined here
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
