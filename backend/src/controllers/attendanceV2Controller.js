const {
  createAttendanceService,
  getAllAttendanceService,
  getAttendanceByStudentService,
  getAttendanceByDateService
} = require(
  "../services/attendanceV2Service"
);

// Mark Attendance
const createAttendance =
async (req, res) => {

  try {

    const result =
      await createAttendanceService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get All Attendance
const getAllAttendance =
async (req, res) => {

  try {

    const data =
      await getAllAttendanceService();

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

// Get Attendance By Student
const getAttendanceByStudent =
async (req, res) => {

  try {

    const data =
      await getAttendanceByStudentService(
        req.params.studentId
      );

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

// Get Attendance By Date
const getAttendanceByDate =
async (req, res) => {

  try {

    const data =
      await getAttendanceByDateService(
        req.params.date
      );

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
  createAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  getAttendanceByDate
};