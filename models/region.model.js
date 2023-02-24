const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Region", {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
  });
};
