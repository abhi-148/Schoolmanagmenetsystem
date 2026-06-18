const pool = require("../config/db");

// Assign Subject To Teacher
const createTeacherSubject = async (
  data
) => {

  const [result] = await pool.query(
    `INSERT INTO teacher_subjects
    (
      staff_id,
      subject_id,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?)`,
    [
      data.staff_id,
      data.subject_id,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All Mappings
const getAllTeacherSubjects =
async () => {

  const [rows] = await pool.query(
    `
    SELECT
      ts.id,
      st.full_name AS teacher_name,
      st.designation,
      sub.subject_name,
      sub.subject_code,
      ts.status

    FROM teacher_subjects ts

    JOIN staff st
      ON st.id = ts.staff_id

    JOIN subjects sub
      ON sub.id = ts.subject_id

    ORDER BY ts.id DESC
    `
  );

  return rows;
};

// Get Subjects By Teacher
const getSubjectsByTeacher =
async (staffId) => {

  const [rows] = await pool.query(
    `
    SELECT
      sub.id,
      sub.subject_name,
      sub.subject_code

    FROM teacher_subjects ts

    JOIN subjects sub
      ON sub.id = ts.subject_id

    WHERE ts.staff_id = ?
    `,
    [staffId]
  );

  return rows;
};

// Delete Mapping
const deleteTeacherSubject =
async (id) => {

  const [result] = await pool.query(
    `DELETE FROM teacher_subjects
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createTeacherSubject,
  getAllTeacherSubjects,
  getSubjectsByTeacher,
  deleteTeacherSubject
};