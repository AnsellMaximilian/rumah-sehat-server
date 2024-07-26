const router = require("express").Router();
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const {
  sequelize: {
    models: {
      Product,
      Customer,
      Supplier,
      DeliveryType,
      ProductCategory,
      Purchase,
      Delivery,
    },
  },
} = require("../../models/index");
const { suppliersAndProducts, customers } = require("../../seeders");

// router.get("/restore-cisarua", async (req, res, next) => {
//   try {
//     const oldpricesCsv = fs.readFileSync(
//       path.join(__dirname, "../..", "files", "oldprices.csv"),
//       "utf8"
//     );

//     let pricesObject = oldpricesCsv
//       .split("\n")
//       .map((row) => row.trim().split(","));

//     pricesObject = pricesObject.slice(1);

//     pricesObject = pricesObject.map((row) => {
//       return {
//         id: parseInt(row[0]),
//         price: parseInt(row[1]),
//         cost: parseInt(row[2]),
//       };
//     });

//     const result = await Promise.all(
//       pricesObject.map(async (price) => {
//         try {
//           await Product.update(
//             {
//               price: price.price,
//               cost: price.cost,
//             },
//             {
//               where: {
//                 id: price.id,
//               },
//             }
//           );
//           return true;
//         } catch (error) {
//           return false;
//         }
//       })
//     );

//     res.send("Worked");

//     // res.json({ data: {} });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/update-cisarua", async (req, res, next) => {
  try {
    const newpricesCsv = fs.readFileSync(
      path.join(__dirname, "../..", "files", "new-prices.csv"),
      "utf8"
    );

    let pricesObject = newpricesCsv
      .split("\n")
      .map((row) => row.trim().split(","));

    pricesObject = pricesObject.slice(1);

    pricesObject = pricesObject.map((row) => {
      return {
        id: parseInt(row[0]),
        price: parseInt(row[1]),
        cost: parseInt(row[2]),
      };
    });

    const result = await Promise.all(
      pricesObject.map(async (price) => {
        try {
          await Product.update(
            {
              price: price.price,
              cost: price.cost,
            },
            {
              where: {
                id: price.id,
              },
            }
          );
          return true;
        } catch (error) {
          return false;
        }
      })
    );
    console.log({ result: result.length, csv: pricesObject.length });

    res.send("Worked");

    // res.json({ data: {} });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
