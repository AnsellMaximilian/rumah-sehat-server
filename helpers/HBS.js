const HBS = require("handlebars");
const fs = require("fs");
const path = require("path");
const { rupiah, sgd, rm } = require("./formatCurrency");

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

const reportStylePartial = HBS.compile(
  fs.readFileSync(
    path.join(__dirname, "..", "templates", "partials", "reportStyle.hbs"),
    "utf-8"
  )
);

const separatorPartial = HBS.compile(
  fs.readFileSync(
    path.join(__dirname, "..", "templates", "partials", "separator.hbs"),
    "utf-8"
  )
);

const productListStylePartial = HBS.compile(
  fs.readFileSync(
    path.join(__dirname, "..", "templates", "partials", "productListStyle.hbs"),
    "utf-8"
  )
);

HBS.registerPartial("separator", separatorPartial);
HBS.registerPartial("reportStyle", reportStylePartial);
HBS.registerPartial("invoiceStyle", invoiceStylePartial);
HBS.registerPartial("productListStyle", productListStylePartial);
HBS.registerPartial("reset", resetPartial);

// HELPERS
HBS.registerHelper("formatRP", function (num) {
  return rupiah(num);
});

HBS.registerHelper("formatSGD", function (num) {
  return sgd(num);
});

HBS.registerHelper("formatRM", function (num) {
  return rm(num);
});

HBS.registerHelper("parseFloat", function (num) {
  return parseFloat(num);
});

module.exports = HBS;
