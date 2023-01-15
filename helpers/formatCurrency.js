const rupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencySign: "accounting",
    minimumFractionDigits: 0,
  }).format(num);

const sgd = (num) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    currencySign: "accounting",
    minimumFractionDigits: 0,
  }).format(num);

module.exports = { rupiah, sgd };
