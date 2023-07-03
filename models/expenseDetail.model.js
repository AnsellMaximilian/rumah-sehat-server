const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ExpenseDetail", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    qty: {
      type: DataTypes.DECIMAL(7, 3),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    unit: {
      type: DataTypes.STRING,
      defaultValue: "Satuan",
      allowNull: false,
      validate: {
        len: 1,
      },
    },

    // productName: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.Product?.name;
    //   },
    // },
    totalAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.amount * this.qty;
      },
    },
  });
};
