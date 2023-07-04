const { DataTypes } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize) => {
  sequelize.define("PurchaseInvoice", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    datePretty: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.date).format("DD MMM YYYY");
      },
    },

    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const adjustments = 0;

        // this.InvoiceAdjustments
        //   ? this.InvoiceAdjustments.reduce(
        //       (total, adj) => total + adj.amount,
        //       0
        //     )
        //   : 0;

        return (
          (this.Purchases
            ? this.Purchases.reduce(
                (total, purchase) => total + purchase.totalPrice,
                0
              )
            : 0) + adjustments
        );
      },
    },
    // hasInvoiceAdjustments: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.InvoiceAdjustments?.length > 0;
    //   },
    // },
  });
};
