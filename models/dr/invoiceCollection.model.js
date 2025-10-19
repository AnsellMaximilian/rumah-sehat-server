const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DrInvoiceCollection", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
    },
    totalInvoicesRP: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoices) return 0;
        return this.DrInvoices.reduce((sum, inv) => sum + (inv.totalPriceRP || 0), 0);
      },
    },
    totalAdjustmentsRP: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoiceCollectionAdjustments) return 0;
        return this.DrInvoiceCollectionAdjustments.reduce(
          (sum, adj) => sum + (adj.amount || 0),
          0
        );
      },
    },
    grandTotalRP: {
      type: DataTypes.VIRTUAL,
      get() {
        return (this.totalInvoicesRP || 0) + (this.totalAdjustmentsRP || 0);
      },
    },
  });
};

