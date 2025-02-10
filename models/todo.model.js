const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
