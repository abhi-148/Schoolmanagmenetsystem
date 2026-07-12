const {
  getDashboardService
} = require("../services/dashboardService");

const getDashboard = async (
  req,
  res
) => {

  try {
const data =
  await getDashboardService(req.user);

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getDashboard
};