require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const PORT = 1107;
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
