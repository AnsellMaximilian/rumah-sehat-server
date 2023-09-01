const { DataTypes } = require("sequelize");
const { getMonth, getLastMonth } = require("../helpers/common");

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
    accountName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // DR SECRET
    getMonthlyDrPointTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoices) {
          return null;
        }
        const { monthStart, monthEnd } = getLastMonth();
        return this.DrInvoices.filter(
          (inv) => inv.date >= monthStart && inv.date <= monthEnd
        ).reduce((sum, inv) => sum + inv.totalPoints, 0);
      },
    },
    getMonthlyDrPriceTotal: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoices) {
          return null;
        }
        const { monthStart, monthEnd } = getLastMonth();
        return this.DrInvoices.filter(
          (inv) => inv.date >= monthStart && inv.date <= monthEnd
        ).reduce((sum, inv) => sum + inv.totalPriceRP, 0);
      },
    },
    hasUsedMonthlyPWP: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoices) {
          return null;
        }
        const { monthStart, monthEnd } = getLastMonth();
        return this.DrInvoices.filter(
          (inv) => inv.date >= monthStart && inv.date <= monthEnd
        ).reduce((has, inv) => {
          const invHasPWP = inv.DrIdDeliveries?.reduce((has, del) => {
            const delHasPWP = del?.DrIdDeliveryDetails.some((det) =>
              det.DrIdItem?.name.includes("PWP")
            );
            return has || delHasPWP;
          }, false);

          return has || invHasPWP;
        }, false);
      },
    },
    hasUsedMonthlyFreeItem: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.DrInvoices) {
          return null;
        }
        const { monthStart, monthEnd } = getLastMonth();
        return this.DrInvoices.filter(
          (inv) => inv.date >= monthStart && inv.date <= monthEnd
        ).reduce((has, inv) => {
          const invHasFreeItem = inv.DrIdDeliveries?.reduce((has, del) => {
            const delHasFreeItem = del?.DrIdDeliveryDetails.some(
              (det) => det.free
            );
            return has || delHasFreeItem;
          }, false);

          return has || invHasFreeItem;
        }, false);
      },
    },

    isEligibleForPWP: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.getMonthlyDrPointTotal === null) {
          return null;
        }
        return this.getMonthlyDrPointTotal >= 150 && !this.hasUsedMonthlyPWP;
      },
    },
    isEligibleForFreeItem: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.getMonthlyDrPriceTotal === null) {
          return null;
        }
        return (
          this.getMonthlyDrPriceTotal >= 8800000 && !this.hasUsedMonthlyFreeItem
        );
      },
    },
  });
};
