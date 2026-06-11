const {
  markAttendance,
  getAllAttendance
} = require("../repositories/attendanceRepository");

const markAttendanceService = async (
  attendanceData
) => {

  await markAttendance(
    attendanceData
  );

  return {
    message:
      "Attendance Marked Successfully"
  };
};

const getAllAttendanceService =
  async () => {

    return await getAllAttendance();

  };

module.exports = {
  markAttendanceService,
  getAllAttendanceService
};