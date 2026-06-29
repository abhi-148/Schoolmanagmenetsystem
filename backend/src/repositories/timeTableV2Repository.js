const pool = require("../config/db");

// ==========================================
// Create Time Table
// ==========================================

const createTimeTable = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_time_table
    (
      batch_id,
      period_id,
      school_subject_id,
      teacher_id,
      day_of_week,
      duration_minutes,
      room_number,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.batch_id,
      data.period_id,
      data.school_subject_id,
      data.teacher_id,
      data.day_of_week,
      data.duration_minutes,
      data.room_number,
      data.status,
      data.created_by
    ]
  );

  return result;

};

// ==========================================
// Duplicate Check
// ==========================================

const checkDuplicateTimeTable = async (
  batch_id,
  period_id,
  day_of_week
) => {

  const [rows] = await pool.query(
    `
    SELECT
      time_table_id
    FROM tbl_time_table
    WHERE
      batch_id = ?
      AND period_id = ?
      AND day_of_week = ?
    `,
    [
      batch_id,
      period_id,
      day_of_week
    ]
  );

  return rows[0];

};

// ==========================================
// Teacher Conflict
// ==========================================

const checkTeacherConflict = async (
  teacher_id,
  period_id,
  day_of_week
) => {

  const [rows] = await pool.query(
    `
    SELECT
      time_table_id
    FROM tbl_time_table
    WHERE
      teacher_id = ?
      AND period_id = ?
      AND day_of_week = ?
    `,
    [
      teacher_id,
      period_id,
      day_of_week
    ]
  );

  return rows[0];

};

// ==========================================
// Room Conflict
// ==========================================

const checkRoomConflict = async (
  room_number,
  period_id,
  day_of_week
) => {

  const [rows] = await pool.query(
    `
    SELECT
      time_table_id
    FROM tbl_time_table
    WHERE
      room_number = ?
      AND period_id = ?
      AND day_of_week = ?
    `,
    [
      room_number,
      period_id,
      day_of_week
    ]
  );

  return rows[0];

};

// ==========================================
// Get All Time Tables
// ==========================================

const getAllTimeTables = async () => {

  const [rows] = await pool.query(
    `
    SELECT

      tt.time_table_id,

      tt.batch_id,
      b.batch_code,

      c.class_name,

      sec.section_name,

      s.subject_name,

      st.full_name AS teacher_name,

      p.period_number,

      p.start_time,
      p.end_time,

      tt.day_of_week,

      tt.room_number,

      tt.duration_minutes,

      tt.status

    FROM tbl_time_table tt

    INNER JOIN tbl_batches b
      ON b.batch_id = tt.batch_id

    INNER JOIN school_classes sc
      ON sc.id = b.school_class_id

    INNER JOIN classes c
      ON c.id = sc.class_id

    INNER JOIN sections sec
      ON sec.id = b.section_id

    INNER JOIN subjects s
      ON s.id = tt.school_subject_id

    INNER JOIN staff st
      ON st.id = tt.teacher_id

    INNER JOIN tbl_school_period p
      ON p.period_id = tt.period_id

    ORDER BY

      FIELD(
        tt.day_of_week,
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ),

      p.period_number
    `
  );

  return rows;

};

// ==========================================
// Get Time Table By Id
// ==========================================

const getTimeTableById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT

      tt.*,

      b.batch_code,

      c.class_name,

      sec.section_name,

      s.subject_name,

      st.full_name AS teacher_name,

      p.period_number,

      p.start_time,

      p.end_time

    FROM tbl_time_table tt

    INNER JOIN tbl_batches b
      ON b.batch_id = tt.batch_id

    INNER JOIN school_classes sc
      ON sc.id = b.school_class_id

    INNER JOIN classes c
      ON c.id = sc.class_id

    INNER JOIN sections sec
      ON sec.id = b.section_id

    INNER JOIN subjects s
      ON s.id = tt.school_subject_id

    INNER JOIN staff st
      ON st.id = tt.teacher_id

    INNER JOIN tbl_school_period p
      ON p.period_id = tt.period_id

    WHERE tt.time_table_id = ?
    `,
    [id]
  );

  return rows[0];

};

// ==========================================
// Get Time Table By Batch
// ==========================================

const getTimeTableByBatch = async (
  batchId
) => {

  const [rows] = await pool.query(
    `
    SELECT

      tt.time_table_id,

      tt.day_of_week,

      s.subject_name,

      st.full_name AS teacher_name,

      p.period_number,

      p.start_time,

      p.end_time,

      tt.room_number,

      tt.status

    FROM tbl_time_table tt

    INNER JOIN subjects s
      ON s.id = tt.school_subject_id

    INNER JOIN staff st
      ON st.id = tt.teacher_id

    INNER JOIN tbl_school_period p
      ON p.period_id = tt.period_id

    WHERE tt.batch_id = ?

    ORDER BY

      FIELD(
        tt.day_of_week,
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ),

      p.period_number
    `,
    [batchId]
  );

  return rows;

};

// ==========================================
// Update
// ==========================================

const updateTimeTable = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_time_table
    SET

      batch_id = ?,

      period_id = ?,

      school_subject_id = ?,

      teacher_id = ?,

      day_of_week = ?,

      duration_minutes = ?,

      room_number = ?,

      status = ?,

      updated_by = ?,

      updated_at = NOW()

    WHERE time_table_id = ?
    `,
    [

      data.batch_id,

      data.period_id,

      data.school_subject_id,

      data.teacher_id,

      data.day_of_week,

      data.duration_minutes,

      data.room_number,

      data.status,

      data.updated_by,

      id

    ]
  );

  return result;

};

// ==========================================
// Delete
// ==========================================

const deleteTimeTable = async (id) => {

  // Delete child records first

  await pool.query(
    `
    DELETE FROM tbl_time_table_substitutions
    WHERE time_table_id = ?
    `,
    [id]
  );

  // Delete timetable

  const [result] = await pool.query(
    `
    DELETE FROM tbl_time_table
    WHERE time_table_id = ?
    `,
    [id]
  );

  return result;

};

module.exports = {

  createTimeTable,

  checkDuplicateTimeTable,

  checkTeacherConflict,

  checkRoomConflict,

  getAllTimeTables,

  getTimeTableById,

  getTimeTableByBatch,

  updateTimeTable,

  deleteTimeTable

};