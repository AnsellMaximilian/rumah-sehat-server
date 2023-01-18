const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DeliveryType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
  });
};
