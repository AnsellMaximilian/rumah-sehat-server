const moment = require("moment");

const getMonth = () => {
  const currentDate = moment();
  const monthStart = currentDate.clone().startOf("month").format("yyyy-MM-DD");
  const monthEnd = currentDate.clone().endOf("month").format("yyyy-MM-DD");

  return { monthStart, monthEnd };
};

const getLastMonth = () => {
  const currentDate = moment();
  const lastDay = currentDate.clone().startOf("month").subtract(1, "day");
  const monthStart = lastDay.startOf("month").format("yyyy-MM-DD");
  const monthEnd = lastDay.endOf("month").format("yyyy-MM-DD");

  return { monthStart, monthEnd };
};

module.exports = { getMonth, getLastMonth };
