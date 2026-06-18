const pool = require("../config/db");

// Create Timetable
const createTimetable = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO timetables
    (
      school_class_id,
      section_id,
      subject_id,
      staff_id,
      day_name,
      start_time,
      end_time,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.school_class_id,
      data.section_id,
      data.subject_id,
      data.staff_id,
      data.day_name,
      data.start_time,
      data.end_time,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All Timetables
const getAllTimetables = async () => {

  const [rows] = await pool.query(`
    SELECT
      t.id,
      c.class_name,
      sec.section_name,
      sub.subject_name,
      st.full_name AS teacher_name,
      t.day_name,
      t.start_time,
      t.end_time,
      t.status

    FROM timetables t

    JOIN school_classes sc
      ON sc.id = t.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    JOIN sections sec
      ON sec.id = t.section_id

    JOIN subjects sub
      ON sub.id = t.subject_id

    JOIN staff st
      ON st.id = t.staff_id

    ORDER BY t.id DESC
  `);

  return rows;
};

// Get By Class
const getTimetableByClass = async (
  schoolClassId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM timetables
    WHERE school_class_id = ?
    ORDER BY day_name,start_time
    `,
    [schoolClassId]
  );

  return rows;
};

// Update
const updateTimetable = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE timetables
    SET
      day_name = ?,
      start_time = ?,
      end_time = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.day_name,
      data.start_time,
      data.end_time,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete
const deleteTimetable = async (
  id
) => {

  const [result] = await pool.query(
    `
    DELETE FROM timetables
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableByClass,
  updateTimetable,
  deleteTimetable
};