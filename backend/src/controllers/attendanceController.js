const {
  markAttendanceService,
  getAllAttendanceService
} = require("../services/attendanceService");

const markAttendance = async (
  req,
  res
) => {

  try {

    console.log(
      "Attendance Data:",
      req.body
    );

   const result =
await markAttendanceService({
  ...req.body,
  schoolId: req.user.schoolId,
  role: req.user.role
});

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.log(
      "Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getAllAttendance = async (
  req,
  res
) => {

  try {

 const attendance =
await getAllAttendanceService(
  req.user
);

    return res.status(200).json({
      success: true,
      data: attendance
    });

  } catch (error) {

    console.log(
      "Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  markAttendance,
  getAllAttendance
};