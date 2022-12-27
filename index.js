require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());

// Test Sequelize connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connection successful");
  })
  .catch(() => {
    console.log("Sequelize connection failed");
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
