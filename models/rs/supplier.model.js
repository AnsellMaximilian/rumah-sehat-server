const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Supplier", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: 1,
      },
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: 1,
      },
    },
  });
};
