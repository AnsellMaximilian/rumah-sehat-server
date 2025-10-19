const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrInvoiceCollectionAdjustment", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    amount: {
      // Signed rupiah amount; positive adds, negative subtracts
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};

