const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Invoice", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customerFullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Customer?.fullName;
      },
    },

    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Deliveries
          ? this.Deliveries.reduce(
              (total, delivery) => total + delivery.totalPrice,
              0
            )
          : 0;
      },
    },
  });
};
