const {
  sequelize: {
    models: { Product, Customer, Supplier, DeliveryType, ProductCategory },
  },
} = require("../models/index");

const customers = async () => {
  await Customer.findOrCreate({
    where: {
      fullName: "Anas Citra",
      phone: "+62 818 734000",
    },
    defaults: {
      fullName: "Anas Citra",
      phone: "+62 818 734000",
      address: "Citra Garden 3 Block a7 no 31 Kalideres",
      rsMember: false,
    },
  });
};

module.exports = customers;
