const {
  markAttendance,
  getAllAttendance
} = require("../repositories/attendanceRepository");

const markAttendanceService = async (
  attendanceData
) => {

  if (
    attendanceData.role ===
    "SCHOOL_ADMIN"
  ) {

    attendanceData.school_id =
      attendanceData.schoolId;

  }

  await markAttendance(
    attendanceData
  );

  return {
    message:
      "Attendance Marked Successfully"
  };

};

const getAllAttendanceService =
async (user) => {

  return await getAllAttendance(
    user
  );

};

module.exports = {
  markAttendanceService,
  getAllAttendanceService
};