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

const getAllAttendance = async (
  user
) => {

  let query = `
    SELECT *
    FROM attendance
  `;

  let params = [];

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    query += `
      WHERE school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }

  query += `
    ORDER BY id DESC
  `;

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;

};

module.exports = {
  markAttendance,
  getAllAttendance
};