const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize("rumah-sehat", "postgres", "Blueblue123", {
  host: "localhost",
  dialect: "postgres",
});
