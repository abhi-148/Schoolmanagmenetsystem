const pool = require("../config/db");

const markAttendance = async (
  attendanceData
) => {

  const [result] = await pool.query(
    `INSERT INTO attendance
    (
      school_id,
      student_id,
      attendance_date,
      status
    )
    VALUES (?, ?, ?, ?)`,
    [
      attendanceData.school_id,
      attendanceData.student_id,
      attendanceData.attendance_date,
      attendanceData.status
    ]
  );

  return result;
};

const getAllAttendance = async () => {

  const [rows] = await pool.query(
    `SELECT * FROM attendance`
  );

  return rows;
};

module.exports = {
  markAttendance,
  getAllAttendance
};