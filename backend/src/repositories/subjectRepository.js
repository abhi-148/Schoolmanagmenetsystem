const pool = require("../config/db");

// Create Subject
const createSubject = async (subjectData) => {

  const [result] = await pool.query(
    `INSERT INTO subjects
    (
      subject_name,
      subject_code,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?)`,
    [
      subjectData.subject_name,
      subjectData.subject_code,
      subjectData.status,
      subjectData.created_by
    ]
  );

  return result;
};

// Get All Subjects
const getAllSubjects = async () => {

  const [rows] = await pool.query(
    `SELECT *
     FROM subjects
     ORDER BY id DESC`
  );

  return rows;
};

// Get Subject By Id
const getSubjectById = async (id) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM subjects
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Update Subject
const updateSubject = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE subjects
     SET
       subject_name = ?,
       subject_code = ?,
       updated_by = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      data.subject_name,
      data.subject_code,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Subject
const deleteSubject = async (id) => {

  const [result] = await pool.query(
    `DELETE FROM subjects
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
};