require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const { makeError } = require("./helpers/errors");

const app = express();

app.use(cors());
app.use(express.json());

// Test Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connection successful");
  })
  .catch(() => {
    console.log("Sequelize connection failed");
  });

app.use("/customers", require("./routes/customers"));
app.use("/regions", require("./routes/regions"));
app.use("/expenses", require("./routes/expenses"));
app.use("/expenditures", require("./routes/expenditures"));
app.use("/transactions", require("./routes/transactions"));
app.use("/dr", require("./routes/dr"));
app.use("/rs", require("./routes/rs"));
app.use("/info", require("./routes/info"));
app.use("/notes", require("./routes/notes"));
app.use("/todos", require("./routes/todos"));

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json(makeError(err));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
