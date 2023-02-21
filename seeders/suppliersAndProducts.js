const {
  sequelize: {
    models: { Product, Customer, Supplier, DeliveryType, ProductCategory },
  },
} = require("../models/index");

const suppliers = async () => {
  // Product categories
  const [categoryMisc] = await ProductCategory.findOrCreate({
    where: {
      name: "Misc",
    },
    defaults: { name: "Misc" },
  });

  // Suppliers
  const [ayamLaura] = await Supplier.findOrCreate({
    where: {
      name: "Ayam Laura",
    },
    defaults: { name: "Ayam Laura" },
  });

  const [mamaRoz] = await Supplier.findOrCreate({
    where: {
      name: "Mama Roz",
    },
    defaults: { name: "Mama Roz" },
  });

  const [meli] = await Supplier.findOrCreate({
    where: {
      name: "Meli",
    },
    defaults: { name: "Meli" },
  });

  const [cisarua] = await Supplier.findOrCreate({
    where: {
      name: "Cisarua",
    },
    defaults: { name: "Cisarua" },
  });

  const [daging] = await Supplier.findOrCreate({
    where: {
      name: "Ko Sandi (Daging)",
    },
    defaults: { name: "Ko Sandi (Daging)" },
  });

  const [healtyhChoice] = await Supplier.findOrCreate({
    where: {
      name: "Healthy Choice",
    },
    defaults: { name: "Healthy Choice" },
  });

  const [lindaKoesno] = await Supplier.findOrCreate({
    where: {
      name: "Linda Koesno",
    },
    defaults: { name: "Linda Koesno" },
  });

  // PRODUCTS
  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (95K)",
      SupplierId: ayamLaura.id,
    },
    defaults: {
      name: "Ayam Kampung (95K)",
      SupplierId: ayamLaura.id,
      price: 95000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (80K)",
      SupplierId: ayamLaura.id,
    },
    defaults: {
      name: "Ayam Kampung (80K)",
      SupplierId: ayamLaura.id,
      price: 80000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BRM Textured Veg Protein",
      SupplierId: healtyhChoice.id,
    },
    defaults: {
      name: "BRM Textured Veg Protein",
      SupplierId: healtyhChoice.id,
      price: 99000,
      cost: 79200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Strawberry",
      SupplierId: mamaRoz.id,
    },
    defaults: {
      name: "Strawberry",
      SupplierId: mamaRoz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Dr Green",
      SupplierId: mamaRoz.id,
    },
    defaults: {
      name: "Dr Green",
      SupplierId: mamaRoz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Supreme",
      SupplierId: mamaRoz.id,
    },
    defaults: {
      name: "Green Supreme",
      SupplierId: mamaRoz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Passion Paradise",
      SupplierId: mamaRoz.id,
    },
    defaults: {
      name: "Passion Paradise",
      SupplierId: mamaRoz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sweet Beets",
      SupplierId: mamaRoz.id,
    },
    defaults: {
      name: "Sweet Beets",
      SupplierId: mamaRoz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Original",
      SupplierId: lindaKoesno.id,
    },
    defaults: {
      name: "Cashew Milk Original",
      SupplierId: lindaKoesno.id,
      price: 40000,
      cost: 35000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Kopi",
      SupplierId: lindaKoesno.id,
    },
    defaults: {
      name: "Cashew Milk Kopi",
      SupplierId: lindaKoesno.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Almond",
      SupplierId: lindaKoesno.id,
    },
    defaults: {
      name: "Cashew Milk Almond",
      SupplierId: lindaKoesno.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pudding Kelapa Muda",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Pudding Kelapa Muda",
      SupplierId: meli.id,
      price: 125000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Empon-empon",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Empon-empon",
      SupplierId: meli.id,
      price: 27000,
      cost: 22500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kunyit Asam",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Kunyit Asam",
      SupplierId: meli.id,
      price: 19000,
      cost: 14000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sengkel Kembang",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sengkel Kembang",
      SupplierId: daging.id,
      price: 273000,
      cost: 220000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Steak",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Steak",
      SupplierId: daging.id,
      price: 260000,
      cost: 210000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Smoked Danish Bacon",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Smoked Danish Bacon",
      SupplierId: daging.id,
      price: 105000,
      cost: 83000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Kampung",
      SupplierId: cisarua.id,
      price: 77000,
      cost: 62000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Telur Ayam",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Telur Ayam",
      SupplierId: cisarua.id,
      price: 49000,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daun Bawang",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Daun Bawang",
      SupplierId: cisarua.id,
      price: 46250,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pakchoy",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pakchoy",
      SupplierId: cisarua.id,
      price: 39500,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Seledri",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Seledri",
      SupplierId: cisarua.id,
      price: 52500,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Wansui",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Wansui",
      SupplierId: cisarua.id,
      price: 82000,
      cost: 72000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Broccoli",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Broccoli",
      SupplierId: cisarua.id,
      price: 58000,
      cost: 47000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sawi Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Sawi Putih",
      SupplierId: cisarua.id,
      price: 37000,
      cost: 25000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Timun Lokal",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Timun Lokal",
      SupplierId: cisarua.id,
      price: 40000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });
};

module.exports = suppliers;
