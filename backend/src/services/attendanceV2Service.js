const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  getAttendanceByDate
} = require(
  "../repositories/attendanceV2Repository"
);

const createAttendanceService =
async (data) => {

  return await createAttendance(
    data
  );

};

const getAllAttendanceService =
async () => {

  return await getAllAttendance();

};

const getAttendanceByStudentService =
async (studentId) => {

  return await getAttendanceByStudent(
    studentId
  );

};

const getAttendanceByDateService =
async (date) => {

  return await getAttendanceByDate(
    date
  );

};

module.exports = {
  createAttendanceService,
  getAllAttendanceService,
  getAttendanceByStudentService,
  getAttendanceByDateService
};