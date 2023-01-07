const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrInvoice", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
  });
};
