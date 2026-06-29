const pool = require("../config/db");

// Create Exam Timetable
const createExamTimetable = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO tbl_exam_timetable
    (
      exam_id,
      subject_id,
      batch_id,
      school_id,
      exam_date,
      start_time,
      end_time,
      room_number,
      supervisor_id,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.exam_id,
      data.subject_id,
      data.batch_id,
      data.school_id,
      data.exam_date,
      data.start_time,
      data.end_time,
      data.room_number,
      data.supervisor_id,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All Exam Timetables
const getAllExamTimetables = async () => {

  const [rows] = await pool.query(
    `SELECT
      ett.exam_timetable_id,
      ett.exam_id,
      e.exam_name,

      ett.subject_id,
      s.subject_name,

      ett.batch_id,
      b.batch_code,

      ett.school_id,
      sc.school_name,

      ett.exam_date,
      ett.start_time,
      ett.end_time,
      ett.room_number,

      ett.supervisor_id,
      st.full_name AS supervisor_name,

      ett.status,
      ett.created_at,
      ett.updated_at

    FROM tbl_exam_timetable ett

    INNER JOIN exams e
      ON ett.exam_id = e.id

    INNER JOIN subjects s
      ON ett.subject_id = s.id

    INNER JOIN tbl_batches b
      ON ett.batch_id = b.batch_id

    INNER JOIN school sc
      ON ett.school_id = sc.id

    INNER JOIN staff st
      ON ett.supervisor_id = st.id

    ORDER BY ett.exam_timetable_id DESC`
  );

  return rows;
};

// Get Exam Timetable By Id
const getExamTimetableById = async (id) => {

  const [rows] = await pool.query(
    `SELECT
      ett.exam_timetable_id,
      ett.exam_id,
      e.exam_name,

      ett.subject_id,
      s.subject_name,

      ett.batch_id,
      b.batch_code,

      ett.school_id,
      sc.school_name,

      ett.exam_date,
      ett.start_time,
      ett.end_time,
      ett.room_number,

      ett.supervisor_id,
      st.full_name AS supervisor_name,

      ett.status,
      ett.created_at,
      ett.updated_at

    FROM tbl_exam_timetable ett

    INNER JOIN exams e
      ON ett.exam_id = e.id

    INNER JOIN subjects s
      ON ett.subject_id = s.id

    INNER JOIN tbl_batches b
      ON ett.batch_id = b.batch_id

    INNER JOIN school sc
      ON ett.school_id = sc.id

    INNER JOIN staff st
      ON ett.supervisor_id = st.id

    WHERE ett.exam_timetable_id = ?`,
    [id]
  );

  return rows[0];
};

// Update Exam Timetable
const updateExamTimetable = async (id, data) => {

  const [result] = await pool.query(
    `UPDATE tbl_exam_timetable
     SET
      exam_id = ?,
      subject_id = ?,
      batch_id = ?,
      school_id = ?,
      exam_date = ?,
      start_time = ?,
      end_time = ?,
      room_number = ?,
      supervisor_id = ?,
      updated_by = ?,
      updated_at = NOW()

     WHERE exam_timetable_id = ?`,
    [
      data.exam_id,
      data.subject_id,
      data.batch_id,
      data.school_id,
      data.exam_date,
      data.start_time,
      data.end_time,
      data.room_number,
      data.supervisor_id,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Exam Timetable
const deleteExamTimetable = async (id) => {

  const [result] = await pool.query(
    `DELETE FROM tbl_exam_timetable
     WHERE exam_timetable_id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createExamTimetable,
  getAllExamTimetables,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable
};