const {
  getDashboardStats
} = require("../repositories/dashboardRepository");

const getDashboardService = async () => {

  return await getDashboardStats();

};

module.exports = {
  getDashboardService
};