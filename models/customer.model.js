const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Customer", {
    // Model attributes are defined here
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rsMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    receiveDrDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activeInvoices: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.Invoices?.filter((invoice) => invoice.status !== "paid");
      },
    },
    firstActiveInvoice: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.activeInvoices
          ? this.activeInvoices.length > 0
            ? this.activeInvoices[0]
            : null
          : null;
      },
    },
  });
};
