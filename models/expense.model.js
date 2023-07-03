const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Expense", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    description: {
      type: DataTypes.TEXT,
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
    // totalPrice: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.price * this.qty;
    //   },
    // },
  });
};
