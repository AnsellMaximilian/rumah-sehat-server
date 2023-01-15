const HBS = require("handlebars");
const fs = require("fs");
const path = require("path");
const { rupiah, sgd } = require("./formatCurrency");

const resetPartial = HBS.compile(
  fs.readFileSync(
    path.join(__dirname, "..", "templates", "partials", "reset.hbs"),
    "utf-8"
  )
);

const invoiceStylePartial = HBS.compile(
  fs.readFileSync(
    path.join(__dirname, "..", "templates", "partials", "invoiceStyle.hbs"),
    "utf-8"
  )
);

HBS.registerPartial("invoiceStyle", invoiceStylePartial);
HBS.registerPartial("reset", resetPartial);

// HELPERS
HBS.registerHelper("formatRP", function (num) {
  return rupiah(num);
});

HBS.registerHelper("formatSGD", function (num) {
  return sgd(num);
});

module.exports = HBS;
