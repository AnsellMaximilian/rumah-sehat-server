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

  const [acropora] = await Supplier.findOrCreate({
    where: {
      name: "Acropora",
    },
    defaults: { name: "Acropora" },
  });

  const [ayamlaura] = await Supplier.findOrCreate({
    where: {
      name: "Ayam Laura",
    },
    defaults: { name: "Ayam Laura" },
  });

  const [cahyo] = await Supplier.findOrCreate({
    where: {
      name: "Cahyo",
    },
    defaults: { name: "Cahyo" },
  });

  const [lindakoesno] = await Supplier.findOrCreate({
    where: {
      name: "Linda Koesno",
    },
    defaults: { name: "Linda Koesno" },
  });

  const [chichi] = await Supplier.findOrCreate({
    where: {
      name: "Chi-chi",
    },
    defaults: { name: "Chi-chi" },
  });

  const [cisarua] = await Supplier.findOrCreate({
    where: {
      name: "Cisarua",
    },
    defaults: { name: "Cisarua" },
  });

  const [daging] = await Supplier.findOrCreate({
    where: {
      name: "Daging",
    },
    defaults: { name: "Daging" },
  });

  const [desi] = await Supplier.findOrCreate({
    where: {
      name: "Desi",
    },
    defaults: { name: "Desi" },
  });

  const [ella] = await Supplier.findOrCreate({
    where: {
      name: "Ella",
    },
    defaults: { name: "Ella" },
  });

  const [evi] = await Supplier.findOrCreate({
    where: {
      name: "Evi",
    },
    defaults: { name: "Evi" },
  });

  const [healthychoice] = await Supplier.findOrCreate({
    where: {
      name: "Healthy Choice",
    },
    defaults: { name: "Healthy Choice" },
  });

  const [kerupuk] = await Supplier.findOrCreate({
    where: {
      name: "Kerupuk",
    },
    defaults: { name: "Kerupuk" },
  });

  const [leafnest] = await Supplier.findOrCreate({
    where: {
      name: "Leaf Nest",
    },
    defaults: { name: "Leaf Nest" },
  });

  const [looloo] = await Supplier.findOrCreate({
    where: {
      name: "Looloo",
    },
    defaults: { name: "Looloo" },
  });

  const [mamaroz] = await Supplier.findOrCreate({
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

  const [nyoman] = await Supplier.findOrCreate({
    where: {
      name: "Nyoman",
    },
    defaults: { name: "Nyoman" },
  });

  const [paklucky] = await Supplier.findOrCreate({
    where: {
      name: "Pak Lucky",
    },
    defaults: { name: "Pak Lucky" },
  });

  const [pempek] = await Supplier.findOrCreate({
    where: {
      name: "Pempek",
    },
    defaults: { name: "Pempek" },
  });

  const [ranny] = await Supplier.findOrCreate({
    where: {
      name: "Ranny",
    },
    defaults: { name: "Ranny" },
  });

  const [temulawakkunyit] = await Supplier.findOrCreate({
    where: {
      name: "Temulawak Kunyit",
    },
    defaults: { name: "Temulawak Kunyit" },
  });

  const [tj] = await Supplier.findOrCreate({
    where: {
      name: "TJ",
    },
    defaults: { name: "TJ" },
  });

  const [vitamin] = await Supplier.findOrCreate({
    where: {
      name: "Vitamin",
    },
    defaults: { name: "Vitamin" },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Children",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Children",
      SupplierId: acropora.id,
      price: 50000,
      cost: 31200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Foot Soak",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Foot Soak",
      SupplierId: acropora.id,
      price: 60000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Charcoal",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Charcoal",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Citrus",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Citrus",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Coffee",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Coffee",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Lavender",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Lavender",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Lemongrass",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Lemongrass",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Oatmeal",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Oatmeal",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Patchouli",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Patchouli",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Peppermint",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Peppermint",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Rose",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Rose",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Tea Tree",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Tea Tree",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sabun Acropora",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Sabun Acropora",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Honey",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Honey",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Acropora Eucalyptus",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Acropora Eucalyptus",
      SupplierId: acropora.id,
      price: 55000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Butter",
      SupplierId: acropora.id,
    },
    defaults: {
      name: "Body Butter",
      SupplierId: acropora.id,
      price: 95000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (45K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (45K)",
      SupplierId: ayamlaura.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (50K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (50K)",
      SupplierId: ayamlaura.id,
      price: 50000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (55K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (55K)",
      SupplierId: ayamlaura.id,
      price: 55000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (60K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (60K)",
      SupplierId: ayamlaura.id,
      price: 60000,
      cost: 55000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (75K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (75K)",
      SupplierId: ayamlaura.id,
      price: 75000,
      cost: 70000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (80K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (80K)",
      SupplierId: ayamlaura.id,
      price: 80000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (85K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (85K)",
      SupplierId: ayamlaura.id,
      price: 85000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (90K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (90K)",
      SupplierId: ayamlaura.id,
      price: 90000,
      cost: 85000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (95K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (95K)",
      SupplierId: ayamlaura.id,
      price: 95000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (100K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (100K)",
      SupplierId: ayamlaura.id,
      price: 100000,
      cost: 95000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung (110K)",
      SupplierId: ayamlaura.id,
    },
    defaults: {
      name: "Ayam Kampung (110K)",
      SupplierId: ayamlaura.id,
      price: 110000,
      cost: 105000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Keripik Singkong",
      SupplierId: cahyo.id,
    },
    defaults: {
      name: "Keripik Singkong",
      SupplierId: cahyo.id,
      price: 39000,
      cost: 24000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Original",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Cashew Milk Original",
      SupplierId: lindakoesno.id,
      price: 40000,
      cost: 35000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bali Sea Salt",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Bali Sea Salt",
      SupplierId: lindakoesno.id,
      price: 60000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Kopi",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Cashew Milk Kopi",
      SupplierId: lindakoesno.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cashew Milk Almond",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Cashew Milk Almond",
      SupplierId: lindakoesno.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Fleur de Salt",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Fleur de Salt",
      SupplierId: lindakoesno.id,
      price: 55000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Moringa Tea",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Moringa Tea",
      SupplierId: lindakoesno.id,
      price: 60000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Palm Sugar",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Palm Sugar",
      SupplierId: lindakoesno.id,
      price: 55000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Madu Kuning 250gr",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Madu Kuning 250gr",
      SupplierId: lindakoesno.id,
      price: 200000,
      cost: 180000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Madu Trigona 250gr",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Madu Trigona 250gr",
      SupplierId: lindakoesno.id,
      price: 225000,
      cost: 202500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Minyak Barco",
      SupplierId: lindakoesno.id,
    },
    defaults: {
      name: "Minyak Barco",
      SupplierId: lindakoesno.id,
      price: 350000,
      cost: 340000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Siomay",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Siomay",
      SupplierId: chichi.id,
      price: 6000,
      cost: 3000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Siomay Tahu",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Siomay Tahu",
      SupplierId: chichi.id,
      price: 6000,
      cost: 3000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Siomay Pare",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Siomay Pare",
      SupplierId: chichi.id,
      price: 6000,
      cost: 3000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Siomay Kol",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Siomay Kol",
      SupplierId: chichi.id,
      price: 6000,
      cost: 3000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Siomay Kentang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Siomay Kentang",
      SupplierId: chichi.id,
      price: 6000,
      cost: 3000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Panggang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Pempek Panggang",
      SupplierId: chichi.id,
      price: 9500,
      cost: 6500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Otak-otak",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Otak-otak",
      SupplierId: chichi.id,
      price: 9500,
      cost: 7000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Minyak Japchae",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Minyak Japchae",
      SupplierId: chichi.id,
      price: 70000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Palembang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kerupuk Palembang",
      SupplierId: chichi.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Apel Malang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Apel Malang",
      SupplierId: chichi.id,
      price: 60000,
      cost: 47000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Alpukat Maumere",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Alpukat Maumere",
      SupplierId: chichi.id,
      price: 50000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kimbap",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kimbap",
      SupplierId: chichi.id,
      price: 60000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kutak",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kutak",
      SupplierId: chichi.id,
      price: 55000,
      cost: 55000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Raw Cheese",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Raw Cheese",
      SupplierId: chichi.id,
      price: 80000,
      cost: 56000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ikan Kembung",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ikan Kembung",
      SupplierId: chichi.id,
      price: 75000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Teri Basah",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Teri Basah",
      SupplierId: chichi.id,
      price: 75000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ngo Hiang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ngo Hiang",
      SupplierId: chichi.id,
      price: 150000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kastengel",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kastengel",
      SupplierId: chichi.id,
      price: 120000,
      cost: 81500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kimchi",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kimchi",
      SupplierId: chichi.id,
      price: 105000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Minyak Wijen",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Minyak Wijen",
      SupplierId: chichi.id,
      price: 105000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ikan Tenggiri",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ikan Tenggiri",
      SupplierId: chichi.id,
      price: 105000,
      cost: 85000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sosis Pork",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Sosis Pork",
      SupplierId: chichi.id,
      price: 120000,
      cost: 97000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Gabus Giling",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Gabus Giling",
      SupplierId: chichi.id,
      price: 160000,
      cost: 100000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sosis Beef",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Sosis Beef",
      SupplierId: chichi.id,
      price: 130000,
      cost: 103000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ghee",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ghee",
      SupplierId: chichi.id,
      price: 125000,
      cost: 106250,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Udang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Udang",
      SupplierId: chichi.id,
      price: 135000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cumi",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Cumi",
      SupplierId: chichi.id,
      price: 110000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tekwan",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Tekwan",
      SupplierId: chichi.id,
      price: 190000,
      cost: 165000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kacang Mede",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Kacang Mede",
      SupplierId: chichi.id,
      price: 195000,
      cost: 170000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bakso Erina",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Bakso Erina",
      SupplierId: chichi.id,
      price: 200000,
      cost: 200000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Teri Kupas",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Teri Kupas",
      SupplierId: chichi.id,
      price: 230000,
      cost: 205000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ikan Gabus",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ikan Gabus",
      SupplierId: chichi.id,
      price: 235000,
      cost: 205000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ebi",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Ebi",
      SupplierId: chichi.id,
      price: 245000,
      cost: 220000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Babi Panggang",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Babi Panggang",
      SupplierId: chichi.id,
      price: 295000,
      cost: 245000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sagu",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Sagu",
      SupplierId: chichi.id,
      price: 265000,
      cost: 265000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Madu Organic",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Madu Organic",
      SupplierId: chichi.id,
      price: 420000,
      cost: 370000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bronson",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Bronson",
      SupplierId: chichi.id,
      price: 390000,
      cost: 390000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Parcel",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Parcel",
      SupplierId: chichi.id,
      price: 400000,
      cost: 400000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Paket Natal",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Paket Natal",
      SupplierId: chichi.id,
      price: 420000,
      cost: 420000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lampe Berger",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Lampe Berger",
      SupplierId: chichi.id,
      price: 475000,
      cost: 430000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Antigen 10 pcs",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Antigen 10 pcs",
      SupplierId: chichi.id,
      price: 487500,
      cost: 487500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Plum (Box)",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Plum (Box)",
      SupplierId: chichi.id,
      price: 500000,
      cost: 500000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BCSO",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "BCSO",
      SupplierId: chichi.id,
      price: 500000,
      cost: 500000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daging Galbi",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Daging Galbi",
      SupplierId: chichi.id,
      price: 650000,
      cost: 550000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Q10 Clear Mask",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Q10 Clear Mask",
      SupplierId: chichi.id,
      price: 580000,
      cost: 580000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Galbi Set",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Galbi Set",
      SupplierId: chichi.id,
      price: 750000,
      cost: 650000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lampe Berger (3)",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Lampe Berger (3)",
      SupplierId: chichi.id,
      price: 912500,
      cost: 912500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "4 Box Optrimax Plum",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "4 Box Optrimax Plum",
      SupplierId: chichi.id,
      price: 2995200,
      cost: 2995200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selimut Korea",
      SupplierId: chichi.id,
    },
    defaults: {
      name: "Selimut Korea",
      SupplierId: chichi.id,
      price: 5000000,
      cost: 5000000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ongkir Cisarua",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ongkir Cisarua",
      SupplierId: cisarua.id,
      price: 10000,
      cost: 10000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tahu Hong Kong",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tahu Hong Kong",
      SupplierId: cisarua.id,
      price: 11500,
      cost: 10000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Susu Kedelai",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Susu Kedelai",
      SupplierId: cisarua.id,
      price: 17000,
      cost: 12000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Nanas",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Nanas",
      SupplierId: cisarua.id,
      price: 20000,
      cost: 13000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tempe 400gr",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tempe 400gr",
      SupplierId: cisarua.id,
      price: 25000,
      cost: 16000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pepaya",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pepaya",
      SupplierId: cisarua.id,
      price: 21000,
      cost: 17000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pisang Ambon",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pisang Ambon",
      SupplierId: cisarua.id,
      price: 21000,
      cost: 17000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pisang Tanduk",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pisang Tanduk",
      SupplierId: cisarua.id,
      price: 27000,
      cost: 22000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Beras Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Beras Putih",
      SupplierId: cisarua.id,
      price: 26000,
      cost: 24000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sereh",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Sereh",
      SupplierId: cisarua.id,
      price: 30000,
      cost: 24000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Beras Pandan Wangi",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Beras Pandan Wangi",
      SupplierId: cisarua.id,
      price: 29000,
      cost: 24000,
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
      name: "Beras Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Beras Merah",
      SupplierId: cisarua.id,
      price: 29000,
      cost: 26000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Labu Siam",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Labu Siam",
      SupplierId: cisarua.id,
      price: 36000,
      cost: 26000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Beras Coklat",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Beras Coklat",
      SupplierId: cisarua.id,
      price: 27600,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lobak Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Lobak Putih",
      SupplierId: cisarua.id,
      price: 37000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Singkong",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Singkong",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ubi Cilembu",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ubi Cilembu",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ubi Jalar Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ubi Jalar Merah",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ubi Jepang",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ubi Jepang",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ubi Ungu",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ubi Ungu",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ubi Kuning",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ubi Kuning",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Talas Belitung",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Talas Belitung",
      SupplierId: cisarua.id,
      price: 32000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Beras Meru",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Beras Meru",
      SupplierId: cisarua.id,
      price: 27600,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Buncis",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Buncis",
      SupplierId: cisarua.id,
      price: 33500,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kunyit",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kunyit",
      SupplierId: cisarua.id,
      price: 37000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pare",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pare",
      SupplierId: cisarua.id,
      price: 39000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tahu Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tahu Putih",
      SupplierId: cisarua.id,
      price: 36000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tomat",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tomat",
      SupplierId: cisarua.id,
      price: 38000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Wortel",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Wortel",
      SupplierId: cisarua.id,
      price: 38000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Telur Negri Organik",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Telur Negri Organik",
      SupplierId: cisarua.id,
      price: 33000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jagung Manis",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jagung Manis",
      SupplierId: cisarua.id,
      price: 34000,
      cost: 29000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Buncis Baby",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Buncis Baby",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kacang Merah Kulit",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kacang Merah Kulit",
      SupplierId: cisarua.id,
      price: 40000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Labu Siam Baby",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Labu Siam Baby",
      SupplierId: cisarua.id,
      price: 38000,
      cost: 30000,
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
      name: "Tahu Kuning",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tahu Kuning",
      SupplierId: cisarua.id,
      price: 35000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Terong Ungu",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Terong Ungu",
      SupplierId: cisarua.id,
      price: 40000,
      cost: 30000,
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

  await Product.findOrCreate({
    where: {
      name: "Labu Acar",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Labu Acar",
      SupplierId: cisarua.id,
      price: 38000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jambu Kristal",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jambu Kristal",
      SupplierId: cisarua.id,
      price: 38000,
      cost: 30000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Timun Jepang",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Timun Jepang",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 31000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kentang",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kentang",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kol Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kol Putih",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Labu Kabocha",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Labu Kabocha",
      SupplierId: cisarua.id,
      price: 37000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selada Air",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Selada Air",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sawi Pahit",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Sawi Pahit",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kol Hijau",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kol Hijau",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 32000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bit Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bit Merah",
      SupplierId: cisarua.id,
      price: 48000,
      cost: 34000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Edamame",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Edamame",
      SupplierId: cisarua.id,
      price: 47000,
      cost: 34000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Oyong",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Oyong",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 34000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selada Keriting",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Selada Keriting",
      SupplierId: cisarua.id,
      price: 46000,
      cost: 34000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Zucchini",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Zucchini",
      SupplierId: cisarua.id,
      price: 47000,
      cost: 34000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lemon",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Lemon",
      SupplierId: cisarua.id,
      price: 46000,
      cost: 35000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kacang Merah Kupas",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kacang Merah Kupas",
      SupplierId: cisarua.id,
      price: 46000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kailan",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kailan",
      SupplierId: cisarua.id,
      price: 47000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lengkuas",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Lengkuas",
      SupplierId: cisarua.id,
      price: 46000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lobak Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Lobak Merah",
      SupplierId: cisarua.id,
      price: 45000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selada Romaine",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Selada Romaine",
      SupplierId: cisarua.id,
      price: 49000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selada Siomak",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Selada Siomak",
      SupplierId: cisarua.id,
      price: 46000,
      cost: 36000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Butternut",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Butternut",
      SupplierId: cisarua.id,
      price: 42000,
      cost: 37000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Mangga",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Mangga",
      SupplierId: cisarua.id,
      price: 48000,
      cost: 37000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bayam Hijau",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bayam Hijau",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bayam Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bayam Merah",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Caisim",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Caisim",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 37500,
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
      name: "Daun Singkong",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Daun Singkong",
      SupplierId: cisarua.id,
      price: 45000,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kacang Panjang",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kacang Panjang",
      SupplierId: cisarua.id,
      price: 50000,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kangkung",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kangkung",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 37500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jagung Acar",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jagung Acar",
      SupplierId: cisarua.id,
      price: 50000,
      cost: 38000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jamur Tiram",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jamur Tiram",
      SupplierId: cisarua.id,
      price: 52000,
      cost: 38000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tomat Cherry",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tomat Cherry",
      SupplierId: cisarua.id,
      price: 52000,
      cost: 38000,
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
      name: "Alpukat Super",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Alpukat Super",
      SupplierId: cisarua.id,
      price: 51000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daun Ginseng",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Daun Ginseng",
      SupplierId: cisarua.id,
      price: 52500,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Okra",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Okra",
      SupplierId: cisarua.id,
      price: 52000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tunas Kol (Ceciwis)",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Tunas Kol (Ceciwis)",
      SupplierId: cisarua.id,
      price: 52500,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daun Pucuk Labu",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Daun Pucuk Labu",
      SupplierId: cisarua.id,
      price: 52500,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pohpohan",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pohpohan",
      SupplierId: cisarua.id,
      price: 45000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bayam Taiwan",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bayam Taiwan",
      SupplierId: cisarua.id,
      price: 50000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kembang Kol",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kembang Kol",
      SupplierId: cisarua.id,
      price: 54000,
      cost: 42000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Selada Head",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Selada Head",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 42000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kacang Tanah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kacang Tanah",
      SupplierId: cisarua.id,
      price: 49000,
      cost: 44000,
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
      name: "Spinach/Horenzo",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Spinach/Horenzo",
      SupplierId: cisarua.id,
      price: 61250,
      cost: 45000,
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
      name: "Kacang Hijau",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kacang Hijau",
      SupplierId: cisarua.id,
      price: 55000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sawi Pagoda",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Sawi Pagoda",
      SupplierId: cisarua.id,
      price: 60000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jahe Gajah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jahe Gajah",
      SupplierId: cisarua.id,
      price: 62000,
      cost: 52000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jeruk Limo",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jeruk Limo",
      SupplierId: cisarua.id,
      price: 62000,
      cost: 52000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jahe Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jahe Putih",
      SupplierId: cisarua.id,
      price: 62000,
      cost: 52000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kol Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kol Merah",
      SupplierId: cisarua.id,
      price: 65000,
      cost: 54000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Seledri Stick",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Seledri Stick",
      SupplierId: cisarua.id,
      price: 72500,
      cost: 55000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Broiler",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Broiler",
      SupplierId: cisarua.id,
      price: 67000,
      cost: 57000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ikan Nila Organik",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ikan Nila Organik",
      SupplierId: cisarua.id,
      price: 67000,
      cost: 57000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Jahe Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Jahe Merah",
      SupplierId: cisarua.id,
      price: 70000,
      cost: 58000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bawang Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bawang Merah",
      SupplierId: cisarua.id,
      price: 70000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bawang Putih",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Bawang Putih",
      SupplierId: cisarua.id,
      price: 70000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pitersely",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Pitersely",
      SupplierId: cisarua.id,
      price: 0,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung Organic",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Kampung Organic",
      SupplierId: cisarua.id,
      price: 77000,
      cost: 62000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Paprika Hijau",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Paprika Hijau",
      SupplierId: cisarua.id,
      price: 77000,
      cost: 62000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Broiler (Utuh)",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Broiler (Utuh)",
      SupplierId: cisarua.id,
      price: 72000,
      cost: 65000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Paprika Merah",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Paprika Merah",
      SupplierId: cisarua.id,
      price: 82000,
      cost: 67000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ayam Kampung 700gr",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Kampung 700gr",
      SupplierId: cisarua.id,
      price: 80000,
      cost: 70000,
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
      name: "Ayam Kampung 900gr",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Ayam Kampung 900gr",
      SupplierId: cisarua.id,
      price: 85000,
      cost: 72000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cabe Kriting",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Cabe Kriting",
      SupplierId: cisarua.id,
      price: 85000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kale Keriting",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kale Keriting",
      SupplierId: cisarua.id,
      price: 101250,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kale Toscano",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kale Toscano",
      SupplierId: cisarua.id,
      price: 101250,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cabe Rawit",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Cabe Rawit",
      SupplierId: cisarua.id,
      price: 85000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kemangi",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Kemangi",
      SupplierId: cisarua.id,
      price: 90000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daun Tang Ho",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Daun Tang Ho",
      SupplierId: cisarua.id,
      price: 90000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Fillet Dada",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Fillet Dada",
      SupplierId: cisarua.id,
      price: 90000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Asparagus",
      SupplierId: cisarua.id,
    },
    defaults: {
      name: "Asparagus",
      SupplierId: cisarua.id,
      price: 141000,
      cost: 116000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Saos BBQ (Small)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Saos BBQ (Small)",
      SupplierId: daging.id,
      price: 65000,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Smoked Pulled Pork",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Smoked Pulled Pork",
      SupplierId: daging.id,
      price: 75000,
      cost: 57000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Barbecue/BBQ Sauce",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Barbecue/BBQ Sauce",
      SupplierId: daging.id,
      price: 125000,
      cost: 76000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pink Bacon",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Pink Bacon",
      SupplierId: daging.id,
      price: 83000,
      cost: 83000,
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
      name: "Soaked Ham",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Soaked Ham",
      SupplierId: daging.id,
      price: 89000,
      cost: 89000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Smoked Carver Ham",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Smoked Carver Ham",
      SupplierId: daging.id,
      price: 115000,
      cost: 89000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sausage (Pork)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sausage (Pork)",
      SupplierId: daging.id,
      price: 120000,
      cost: 97000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sausage (Beef)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sausage (Beef)",
      SupplierId: daging.id,
      price: 130000,
      cost: 103000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daging Giling",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Daging Giling",
      SupplierId: daging.id,
      price: 180000,
      cost: 130000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Patty Burger",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Patty Burger",
      SupplierId: daging.id,
      price: 206000,
      cost: 150000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Saikoro (500GR)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Saikoro (500GR)",
      SupplierId: daging.id,
      price: 178500,
      cost: 152500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shank/Sengkel",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Shank/Sengkel",
      SupplierId: daging.id,
      price: 190000,
      cost: 160000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daging Rendang",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Daging Rendang",
      SupplierId: daging.id,
      price: 220000,
      cost: 170000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Gandek",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Gandek",
      SupplierId: daging.id,
      price: 220000,
      cost: 170000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Iga Potong",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Iga Potong",
      SupplierId: daging.id,
      price: 230000,
      cost: 180000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Top Side (ptg 20 pcs)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Top Side (ptg 20 pcs)",
      SupplierId: daging.id,
      price: 232000,
      cost: 180000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Leg Bone",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Leg Bone",
      SupplierId: daging.id,
      price: 242000,
      cost: 190000,
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
      name: "Sirloin Shabu",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Shabu",
      SupplierId: daging.id,
      price: 261000,
      cost: 216000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Short Plate",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Short Plate",
      SupplierId: daging.id,
      price: 270000,
      cost: 220000,
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
      name: "Smoked Pork Ribs",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Smoked Pork Ribs",
      SupplierId: daging.id,
      price: 250000,
      cost: 225000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pork Short Ribs",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Pork Short Ribs",
      SupplierId: daging.id,
      price: 250000,
      cost: 225000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Shortloin",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Shortloin",
      SupplierId: daging.id,
      price: 280000,
      cost: 230000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Shabu",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Shabu",
      SupplierId: daging.id,
      price: 280000,
      cost: 230000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Iga Potong PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Iga Potong PRS",
      SupplierId: daging.id,
      price: 290000,
      cost: 240000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Buntut",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Buntut",
      SupplierId: daging.id,
      price: 296000,
      cost: 246000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Rack",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Rack",
      SupplierId: daging.id,
      price: 301000,
      cost: 250000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Leg Boneless",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Leg Boneless",
      SupplierId: daging.id,
      price: 300000,
      cost: 250000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Steak",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Steak",
      SupplierId: daging.id,
      price: 310000,
      cost: 260000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Shabu",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Shabu",
      SupplierId: daging.id,
      price: 320000,
      cost: 270000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Steak",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Steak",
      SupplierId: daging.id,
      price: 469000,
      cost: 420000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Wagyu MB 2",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Wagyu MB 2",
      SupplierId: daging.id,
      price: 524000,
      cost: 420000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Shabu Wagyu MB 2",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Shabu Wagyu MB 2",
      SupplierId: daging.id,
      price: 526000,
      cost: 426000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Shabu",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Shabu",
      SupplierId: daging.id,
      price: 479000,
      cost: 430000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lamb Shoulder Boneless Shabu",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Lamb Shoulder Boneless Shabu",
      SupplierId: daging.id,
      price: 530000,
      cost: 480000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Steak PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Steak PRS",
      SupplierId: daging.id,
      price: 559000,
      cost: 510000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Shabu PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Shabu PRS",
      SupplierId: daging.id,
      price: 579000,
      cost: 530000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Steak Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Steak Organic",
      SupplierId: daging.id,
      price: 620000,
      cost: 570000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ribeye Shabu Wagyu MB 2",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Ribeye Shabu Wagyu MB 2",
      SupplierId: daging.id,
      price: 680000,
      cost: 580000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ribeye Wagyu MB 2",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Ribeye Wagyu MB 2",
      SupplierId: daging.id,
      price: 686000,
      cost: 586000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Shabu Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Shabu Organic",
      SupplierId: daging.id,
      price: 650000,
      cost: 600000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Wagyu MB 2 (Angus MB2)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Wagyu MB 2 (Angus MB2)",
      SupplierId: daging.id,
      price: 750000,
      cost: 650000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Wagyu MB 3",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Wagyu MB 3",
      SupplierId: daging.id,
      price: 740000,
      cost: 650000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye PRS",
      SupplierId: daging.id,
      price: 870000,
      cost: 820000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Steak Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Steak Organic",
      SupplierId: daging.id,
      price: 871000,
      cost: 820000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Shabu PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Shabu PRS",
      SupplierId: daging.id,
      price: 900000,
      cost: 850000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Shabu Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Shabu Organic",
      SupplierId: daging.id,
      price: 900000,
      cost: 850000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ribeye Wagyu MB 3",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Ribeye Wagyu MB 3",
      SupplierId: daging.id,
      price: 1010000,
      cost: 910000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sirloin Wagyu MB 7",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Sirloin Wagyu MB 7",
      SupplierId: daging.id,
      price: 1020000,
      cost: 920000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Steak PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Steak PRS",
      SupplierId: daging.id,
      price: 989000,
      cost: 940000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Shabu PRS",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Shabu PRS",
      SupplierId: daging.id,
      price: 1019000,
      cost: 970000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Steak Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Steak Organic",
      SupplierId: daging.id,
      price: 1029000,
      cost: 980000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Shabu Organic",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Shabu Organic",
      SupplierId: daging.id,
      price: 1059000,
      cost: 1010000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Wagyu MB 3 (Angus MB2)",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Wagyu MB 3 (Angus MB2)",
      SupplierId: daging.id,
      price: 1149000,
      cost: 1050000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Wagyu 7",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Wagyu 7",
      SupplierId: daging.id,
      price: 1110000,
      cost: 1060000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ribeye Wagyu MB 7",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Ribeye Wagyu MB 7",
      SupplierId: daging.id,
      price: 1276000,
      cost: 1176000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Wagyu MB 7",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Wagyu MB 7",
      SupplierId: daging.id,
      price: 1509000,
      cost: 1410000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Knuckle Satsuma Gyu A 5",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Knuckle Satsuma Gyu A 5",
      SupplierId: daging.id,
      price: 2060000,
      cost: 1960000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Rib Eye Satsuma Gyu A 5",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Rib Eye Satsuma Gyu A 5",
      SupplierId: daging.id,
      price: 2950000,
      cost: 2800000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tenderloin Satsuma Gyu A 5",
      SupplierId: daging.id,
    },
    defaults: {
      name: "Tenderloin Satsuma Gyu A 5",
      SupplierId: daging.id,
      price: 3830000,
      cost: 3700000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Udang Peci",
      SupplierId: desi.id,
    },
    defaults: {
      name: "Udang Peci",
      SupplierId: desi.id,
      price: 140000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Udang Api",
      SupplierId: desi.id,
    },
    defaults: {
      name: "Udang Api",
      SupplierId: desi.id,
      price: 140000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bakso Halus",
      SupplierId: ella.id,
    },
    defaults: {
      name: "Bakso Halus",
      SupplierId: ella.id,
      price: 100000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bakso Urat",
      SupplierId: ella.id,
    },
    defaults: {
      name: "Bakso Urat",
      SupplierId: ella.id,
      price: 100000,
      cost: 75000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bakso",
      SupplierId: evi.id,
    },
    defaults: {
      name: "Bakso",
      SupplierId: evi.id,
      price: 4500,
      cost: 4500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bakso Tahu",
      SupplierId: evi.id,
    },
    defaults: {
      name: "Bakso Tahu",
      SupplierId: evi.id,
      price: 6000,
      cost: 6000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Es Jelly Cincau",
      SupplierId: evi.id,
    },
    defaults: {
      name: "Es Jelly Cincau",
      SupplierId: evi.id,
      price: 20000,
      cost: 16000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pudding Buah",
      SupplierId: evi.id,
    },
    defaults: {
      name: "Pudding Buah",
      SupplierId: evi.id,
      price: 185000,
      cost: 185000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ongkir Healthy Choice",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Ongkir Healthy Choice",
      SupplierId: healthychoice.id,
      price: 9000,
      cost: 9000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pops",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Pops",
      SupplierId: healthychoice.id,
      price: 23000,
      cost: 18400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cookies Old Fashioned",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Cookies Old Fashioned",
      SupplierId: healthychoice.id,
      price: 43000,
      cost: 34400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Brownie Chips Almond",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Brownie Chips Almond",
      SupplierId: healthychoice.id,
      price: 46000,
      cost: 36800,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Brownie Chips Dark Choco",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Brownie Chips Dark Choco",
      SupplierId: healthychoice.id,
      price: 46000,
      cost: 36800,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "HC Gula Batu ORG",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "HC Gula Batu ORG",
      SupplierId: healthychoice.id,
      price: 46000,
      cost: 36800,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cookies Mini Choco Almond",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Cookies Mini Choco Almond",
      SupplierId: healthychoice.id,
      price: 49000,
      cost: 39200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tepung Ubi Ganyong",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Tepung Ubi Ganyong",
      SupplierId: healthychoice.id,
      price: 53000,
      cost: 42400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Gula Aren Organik",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Gula Aren Organik",
      SupplierId: healthychoice.id,
      price: 56000,
      cost: 44800,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Honey Cinnamon",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Granola Honey Cinnamon",
      SupplierId: healthychoice.id,
      price: 63000,
      cost: 50400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Choco Nut",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Granola Choco Nut",
      SupplierId: healthychoice.id,
      price: 63000,
      cost: 50400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Nutty Nut",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Granola Nutty Nut",
      SupplierId: healthychoice.id,
      price: 63000,
      cost: 50400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Red Ginger Drink",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Red Ginger Drink",
      SupplierId: healthychoice.id,
      price: 63000,
      cost: 50400,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "HC Beras Merah ORG (2kg)",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "HC Beras Merah ORG (2kg)",
      SupplierId: healthychoice.id,
      price: 89000,
      cost: 71200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Banana Muffin",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Banana Muffin",
      SupplierId: healthychoice.id,
      price: 95000,
      cost: 79000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BRM Textured Veg Protein",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "BRM Textured Veg Protein",
      SupplierId: healthychoice.id,
      price: 99000,
      cost: 79200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Banana Bread",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Banana Bread",
      SupplierId: healthychoice.id,
      price: 110000,
      cost: 99000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BRM Cereal-Muesli",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "BRM Cereal-Muesli",
      SupplierId: healthychoice.id,
      price: 139000,
      cost: 111200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BRM Organic Old Fashioned Rolled Oats",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "BRM Organic Old Fashioned Rolled Oats",
      SupplierId: healthychoice.id,
      price: 149000,
      cost: 119200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "BRM Organic Quick Cooking Rolled Oats",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "BRM Organic Quick Cooking Rolled Oats",
      SupplierId: healthychoice.id,
      price: 149000,
      cost: 119200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vegetarian G Seasoning",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Vegetarian G Seasoning",
      SupplierId: healthychoice.id,
      price: 159000,
      cost: 127200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bragg Nutritional Yeast Seasoning",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Bragg Nutritional Yeast Seasoning",
      SupplierId: healthychoice.id,
      price: 159000,
      cost: 127200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Keto Bread",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Almond Keto Bread",
      SupplierId: healthychoice.id,
      price: 135000,
      cost: 129000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "HC Beras Merah ORG (5kg)",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "HC Beras Merah ORG (5kg)",
      SupplierId: healthychoice.id,
      price: 209000,
      cost: 167200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Bragg Olive Oil",
      SupplierId: healthychoice.id,
    },
    defaults: {
      name: "Bragg Olive Oil",
      SupplierId: healthychoice.id,
      price: 319000,
      cost: 255200,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Kemplang",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Kemplang",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Keriting",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Keriting",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Lebar",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Lebar",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Mangkok",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Mangkok",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Kancing",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Kancing",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Coin",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Coin",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kerupuk Panggang",
      SupplierId: kerupuk.id,
    },
    defaults: {
      name: "Kerupuk Panggang",
      SupplierId: kerupuk.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Reuse From Customers",
      SupplierId: leafnest.id,
    },
    defaults: {
      name: "Reuse From Customers",
      SupplierId: leafnest.id,
      price: 5000,
      cost: 5000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sarang Burung Walet RTE",
      SupplierId: leafnest.id,
    },
    defaults: {
      name: "Sarang Burung Walet RTE",
      SupplierId: leafnest.id,
      price: 150000,
      cost: 117000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sarang Burung Walet RTE 250ml",
      SupplierId: leafnest.id,
    },
    defaults: {
      name: "Sarang Burung Walet RTE 250ml",
      SupplierId: leafnest.id,
      price: 360000,
      cost: 280000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi-surface Disinfectant 100 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi-surface Disinfectant 100 ml",
      SupplierId: looloo.id,
      price: 20000,
      cost: 15000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi Surface 100ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi Surface 100ml",
      SupplierId: looloo.id,
      price: 21250,
      cost: 15000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On-the-go Sanitizer 100 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On-the-go Sanitizer 100 ml",
      SupplierId: looloo.id,
      price: 25000,
      cost: 18000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On the Go 100ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On the Go 100ml",
      SupplierId: looloo.id,
      price: 25500,
      cost: 18000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Food Grade Disinfectant 100 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Food Grade Disinfectant 100 ml",
      SupplierId: looloo.id,
      price: 30000,
      cost: 21000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi-surface Disinfectant 250 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi-surface Disinfectant 250 ml",
      SupplierId: looloo.id,
      price: 30000,
      cost: 21000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Food Grade 100ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Food Grade 100ml",
      SupplierId: looloo.id,
      price: 29750,
      cost: 21000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi Surface 250ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi Surface 250ml",
      SupplierId: looloo.id,
      price: 29750,
      cost: 21000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sabun Looloo",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Sabun Looloo",
      SupplierId: looloo.id,
      price: 38500,
      cost: 26000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pouch Looloo",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Pouch Looloo",
      SupplierId: looloo.id,
      price: 27000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Food Grade Disinfectant 250 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Food Grade Disinfectant 250 ml",
      SupplierId: looloo.id,
      price: 55000,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi-surface Disinfectant 1 Liter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi-surface Disinfectant 1 Liter",
      SupplierId: looloo.id,
      price: 55000,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Food Grade 250ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Food Grade 250ml",
      SupplierId: looloo.id,
      price: 55250,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Multi Surface 1liter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Multi Surface 1liter",
      SupplierId: looloo.id,
      price: 55250,
      cost: 39000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On-the-go Sanitizer 500 ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On-the-go Sanitizer 500 ml",
      SupplierId: looloo.id,
      price: 65000,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On the Go 500ml",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On the Go 500ml",
      SupplierId: looloo.id,
      price: 63750,
      cost: 45000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Serum Looloo",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Serum Looloo",
      SupplierId: looloo.id,
      price: 85000,
      cost: 52000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On-the-go Sanitizer 1 Liter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On-the-go Sanitizer 1 Liter",
      SupplierId: looloo.id,
      price: 100000,
      cost: 72000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "On the Go 1liter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "On the Go 1liter",
      SupplierId: looloo.id,
      price: 102000,
      cost: 72000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sabun Garden Rose",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Sabun Garden Rose",
      SupplierId: looloo.id,
      price: 135000,
      cost: 72000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Food Grade 1liter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Food Grade 1liter",
      SupplierId: looloo.id,
      price: 127500,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Gel Grapefruit & Bambu",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Gel Grapefruit & Bambu",
      SupplierId: looloo.id,
      price: 155000,
      cost: 101500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Gel Mangga & Ara",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Gel Mangga & Ara",
      SupplierId: looloo.id,
      price: 155000,
      cost: 101500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Gel Mawar",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Gel Mawar",
      SupplierId: looloo.id,
      price: 155000,
      cost: 101500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Gel Olive & Aloe",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Gel Olive & Aloe",
      SupplierId: looloo.id,
      price: 155000,
      cost: 101500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Gel Bergamout & Mint",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Gel Bergamout & Mint",
      SupplierId: looloo.id,
      price: 155000,
      cost: 101500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Cream Kelapa",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Cream Kelapa",
      SupplierId: looloo.id,
      price: 155000,
      cost: 105000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Aloe",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Aloe",
      SupplierId: looloo.id,
      price: 185000,
      cost: 115500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Cocoa Butter & Hibiscus",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Cocoa Butter & Hibiscus",
      SupplierId: looloo.id,
      price: 185000,
      cost: 115500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Olive & Aloe",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Olive & Aloe",
      SupplierId: looloo.id,
      price: 185000,
      cost: 115500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Rose",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Rose",
      SupplierId: looloo.id,
      price: 185000,
      cost: 115500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Hand Cream Pomegranate & Shea Butter",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Hand Cream Pomegranate & Shea Butter",
      SupplierId: looloo.id,
      price: 185000,
      cost: 115500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Hand Cream Calendula & Aloe Vera",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Hand Cream Calendula & Aloe Vera",
      SupplierId: looloo.id,
      price: 185000,
      cost: 122500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Hand Cream Rose",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Hand Cream Rose",
      SupplierId: looloo.id,
      price: 185000,
      cost: 122500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Shower Cream Almond",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Shower Cream Almond",
      SupplierId: looloo.id,
      price: 155000,
      cost: 122500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Elderflower",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Elderflower",
      SupplierId: looloo.id,
      price: 185000,
      cost: 129500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Body Lotion Jahe & Birch",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Body Lotion Jahe & Birch",
      SupplierId: looloo.id,
      price: 185000,
      cost: 129500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Hand Cream Olive",
      SupplierId: looloo.id,
    },
    defaults: {
      name: "Hand Cream Olive",
      SupplierId: looloo.id,
      price: 185000,
      cost: 136500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Guava",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Guava",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 34650,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Coconut Collagen",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Coconut Collagen",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 37962,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Radiance",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Radiance",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 37962,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Mama Roz - Normal Juice",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Mama Roz - Normal Juice",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 39600,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kiwi",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Kiwi",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 39600,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Passion Delight",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Passion Delight",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 39600,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Carrot Crush",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Carrot Crush",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 39960,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Purify",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Purify",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 39960,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Daily Green",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Daily Green",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Celery",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Green Celery",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Mama Roz - Almond/Protein",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Mama Roz - Almond/Protein",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Classic",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Classic",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Berry Protein",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Berry Protein",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Protein",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Green Protein",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Purple Protein",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Purple Protein",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Peach Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Peach Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 41580,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Orange Carrot",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Orange Carrot",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 41958,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Purple Freak",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Purple Freak",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 41958,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Purple Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Purple Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 41958,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Passion Mango",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Passion Mango",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 41958,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Coconut Aloe Vera",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Coconut Aloe Vera",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 42957,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ginger Love",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Ginger Love",
      SupplierId: mamaroz.id,
      price: 58000,
      cost: 42957,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lemonade",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Lemonade",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 42957,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Soursop Guava",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Soursop Guava",
      SupplierId: mamaroz.id,
      price: 58000,
      cost: 42957,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Wellness",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Wellness",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 42957,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Apple Blackberry",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Apple Blackberry",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Apple Carrot",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Apple Carrot",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Berry Goodness",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Berry Goodness",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Berry Veggies",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Berry Veggies",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cleanse",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Cleanse",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "DR Green",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "DR Green",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Delight",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Green Delight",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Supreme",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Green Supreme",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Mighty Green",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Mighty Green",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Orange Mango",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Orange Mango",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Orange Strawberry",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Orange Strawberry",
      SupplierId: mamaroz.id,
      price: 50000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Passion Paradise",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Passion Paradise",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Strawberry",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Strawberry",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Sweet Beets",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Sweet Beets",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "True Essential",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "True Essential",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Passion Bliss",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Passion Bliss",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Berry Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Berry Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Blueberry Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Blueberry Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 51000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Matcha Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Matcha Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Tropical Bliss",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Tropical Bliss",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Peach Berry",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Peach Berry",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Green Meal Smoothie",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Green Meal Smoothie",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 44955,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Coconut Chocolate",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Coconut Chocolate",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46530,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Dates Cinnamon",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Dates Cinnamon",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46530,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Hazelnut",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Hazelnut",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46530,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Maca Vanilla",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Maca Vanilla",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46530,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Pistachio",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Pistachio",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46530,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Coffee",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Coffee",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46953,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Pistachio",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Almond Pistachio",
      SupplierId: mamaroz.id,
      price: 55000,
      cost: 46953,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Orange",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Orange",
      SupplierId: mamaroz.id,
      price: 53000,
      cost: 52947,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Paket Detox",
      SupplierId: mamaroz.id,
    },
    defaults: {
      name: "Paket Detox",
      SupplierId: mamaroz.id,
      price: 650000,
      cost: 600000,
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
      name: "Empon-Empon",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Empon-Empon",
      SupplierId: meli.id,
      price: 27000,
      cost: 22500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Ongol-ongol",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Ongol-ongol",
      SupplierId: meli.id,
      price: 35000,
      cost: 35000,
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
      name: "Pudding Es Teler",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Pudding Es Teler",
      SupplierId: meli.id,
      price: 130000,
      cost: 115000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pudding Alpukat",
      SupplierId: meli.id,
    },
    defaults: {
      name: "Pudding Alpukat",
      SupplierId: meli.id,
      price: 150000,
      cost: 125000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Original",
      SupplierId: nyoman.id,
    },
    defaults: {
      name: "Granola Original",
      SupplierId: nyoman.id,
      price: 39000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Peanut Butter",
      SupplierId: nyoman.id,
    },
    defaults: {
      name: "Granola Peanut Butter",
      SupplierId: nyoman.id,
      price: 39000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Granola Cinnamon",
      SupplierId: nyoman.id,
    },
    defaults: {
      name: "Granola Cinnamon",
      SupplierId: nyoman.id,
      price: 39000,
      cost: 27000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pamelo (kg)",
      SupplierId: paklucky.id,
    },
    defaults: {
      name: "Pamelo (kg)",
      SupplierId: paklucky.id,
      price: 35000,
      cost: 28000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Alpukat (kg)",
      SupplierId: paklucky.id,
    },
    defaults: {
      name: "Alpukat (kg)",
      SupplierId: paklucky.id,
      price: 50000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Adaan",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Adaan",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Kecil",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Kecil",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Keriting",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Keriting",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Kulit",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Kulit",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Lenjer Kecil",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Lenjer Kecil",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Pistel",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Pistel",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Telor Kecil",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Telor Kecil",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Panjang",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Panjang",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Bulat",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Bulat",
      SupplierId: pempek.id,
      price: 9500,
      cost: 5500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Kapal Selam Cik Wan",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Kapal Selam Cik Wan",
      SupplierId: pempek.id,
      price: 25000,
      cost: 25000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Kapal Selam",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Kapal Selam",
      SupplierId: pempek.id,
      price: 45000,
      cost: 30500,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pempek Lenjer Besar",
      SupplierId: pempek.id,
    },
    defaults: {
      name: "Pempek Lenjer Besar",
      SupplierId: pempek.id,
      price: 85000,
      cost: 50000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Buah Naga",
      SupplierId: ranny.id,
    },
    defaults: {
      name: "Buah Naga",
      SupplierId: ranny.id,
      price: 50000,
      cost: 40000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Teri Garing",
      SupplierId: ranny.id,
    },
    defaults: {
      name: "Teri Garing",
      SupplierId: ranny.id,
      price: 225000,
      cost: 200000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Teri Asin",
      SupplierId: ranny.id,
    },
    defaults: {
      name: "Teri Asin",
      SupplierId: ranny.id,
      price: 240000,
      cost: 215000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Teri Nasi",
      SupplierId: ranny.id,
    },
    defaults: {
      name: "Teri Nasi",
      SupplierId: ranny.id,
      price: 245000,
      cost: 215000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Kunyit Putih",
      SupplierId: temulawakkunyit.id,
    },
    defaults: {
      name: "Kunyit Putih",
      SupplierId: temulawakkunyit.id,
      price: 75000,
      cost: 42000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Temulawak",
      SupplierId: temulawakkunyit.id,
    },
    defaults: {
      name: "Temulawak",
      SupplierId: temulawakkunyit.id,
      price: 75000,
      cost: 42000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Milk Plain",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Almond Milk Plain",
      SupplierId: tj.id,
      price: 60000,
      cost: 55000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Milk Honey",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Almond Milk Honey",
      SupplierId: tj.id,
      price: 60000,
      cost: 55000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Bandrek Palm Sugar",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Almond Bandrek Palm Sugar",
      SupplierId: tj.id,
      price: 65000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Bandrek Honey",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Almond Bandrek Honey",
      SupplierId: tj.id,
      price: 65000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Almond Bandrek Plain",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Almond Bandrek Plain",
      SupplierId: tj.id,
      price: 65000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Susu Mixed Nuts Plain",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Susu Mixed Nuts Plain",
      SupplierId: tj.id,
      price: 65000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Susu Mixed Nuts Honey",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Susu Mixed Nuts Honey",
      SupplierId: tj.id,
      price: 65000,
      cost: 60000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cupcake Choco",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Cupcake Choco",
      SupplierId: tj.id,
      price: 100000,
      cost: 80000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cupcake Green Tea",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Cupcake Green Tea",
      SupplierId: tj.id,
      price: 100000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Cupcake Vanilla",
      SupplierId: tj.id,
    },
    defaults: {
      name: "Cupcake Vanilla",
      SupplierId: tj.id,
      price: 100000,
      cost: 90000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pipping Rock Vitamin D",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Pipping Rock Vitamin D",
      SupplierId: vitamin.id,
      price: 140000,
      cost: 105000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pipping Rock Vitamin D 10000iu",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Pipping Rock Vitamin D 10000iu",
      SupplierId: vitamin.id,
      price: 150000,
      cost: 110000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin E 1000iu",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin E 1000iu",
      SupplierId: vitamin.id,
      price: 190000,
      cost: 160000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin K2",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin K2",
      SupplierId: vitamin.id,
      price: 195000,
      cost: 165000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Life Extension Magnesium",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Life Extension Magnesium",
      SupplierId: vitamin.id,
      price: 250000,
      cost: 180000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Life Extension Zinc",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Life Extension Zinc",
      SupplierId: vitamin.id,
      price: 190000,
      cost: 190000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pipping Rock Vit D (250)",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Pipping Rock Vit D (250)",
      SupplierId: vitamin.id,
      price: 280000,
      cost: 200000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Pipping Rock Digest IT",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Pipping Rock Digest IT",
      SupplierId: vitamin.id,
      price: 300000,
      cost: 235000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C Chewable",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C Chewable",
      SupplierId: vitamin.id,
      price: 350000,
      cost: 250000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Avanze Zinc",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Avanze Zinc",
      SupplierId: vitamin.id,
      price: 275000,
      cost: 275000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C",
      SupplierId: vitamin.id,
      price: 400000,
      cost: 300000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C Citrus",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C Citrus",
      SupplierId: vitamin.id,
      price: 400000,
      cost: 300000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin E",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin E",
      SupplierId: vitamin.id,
      price: 400000,
      cost: 300000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "K2 Softgel (180)",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "K2 Softgel (180)",
      SupplierId: vitamin.id,
      price: 375000,
      cost: 305000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Zinc",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Zinc",
      SupplierId: vitamin.id,
      price: 500000,
      cost: 400000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C (250)",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C (250)",
      SupplierId: vitamin.id,
      price: 750000,
      cost: 650000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Lyposheric Vit C",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Lyposheric Vit C",
      SupplierId: vitamin.id,
      price: 745000,
      cost: 695000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C (900K)",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C (900K)",
      SupplierId: vitamin.id,
      price: 900000,
      cost: 800000,
      ProductCategoryId: categoryMisc.id,
    },
  });

  await Product.findOrCreate({
    where: {
      name: "Vitamin C Ester C",
      SupplierId: vitamin.id,
    },
    defaults: {
      name: "Vitamin C Ester C",
      SupplierId: vitamin.id,
      price: 1350000,
      cost: 1250000,
      ProductCategoryId: categoryMisc.id,
    },
  });
};

module.exports = suppliers;
