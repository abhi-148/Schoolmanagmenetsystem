const {
  getDashboardStats,
  getSchoolDashboardStats
} = require("../repositories/dashboardRepository");

const getDashboardService = async (user) => {

  const dashboard =
    await getDashboardStats();

  if (user.role === "SUPER_ADMIN") {

    return dashboard;

  }

  if (user.role === "SCHOOL_ADMIN") {

  return await getSchoolDashboardStats(
    user.schoolId
  );

}

 if (user.role === "STAFF") {

  return await getSchoolDashboardStats(
    user.school_id
  );

}

  if (user.role === "STUDENT") {

    return {
      message:
        "Welcome Student"
    };

  }

  throw new Error("Invalid Role");

};

module.exports = {
  getDashboardService
};