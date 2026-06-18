const pool = require("../config/db");

// Mark Attendance
const createAttendance = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO attendance_v2
    (
      school_id,
      school_class_id,
      section_id,
      student_id,
      attendance_date,
      status,
      remarks,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.school_id,
      data.school_class_id,
      data.section_id,
      data.student_id,
      data.attendance_date,
      data.status,
      data.remarks,
      data.created_by
    ]
  );

  return result;
};

// Get All Attendance
const getAllAttendance = async () => {

  const [rows] = await pool.query(`
    SELECT
      a.id,
      a.attendance_date,
      a.status,
      a.remarks,

      s.full_name,
      s.roll_number,

      c.class_name,
      sec.section_name

    FROM attendance_v2 a

    JOIN student s
      ON s.id = a.student_id

    JOIN school_classes sc
      ON sc.id = a.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    JOIN sections sec
      ON sec.id = a.section_id

    ORDER BY a.id DESC
  `);

  return rows;
};

// Get By Student
const getAttendanceByStudent =
async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM attendance_v2
    WHERE student_id = ?
    ORDER BY attendance_date DESC
    `,
    [studentId]
  );

  return rows;
};

// Get By Date
const getAttendanceByDate =
async (date) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM attendance_v2
    WHERE attendance_date = ?
    `,
    [date]
  );

  return rows;
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  getAttendanceByDate
};