const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Note", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
