const pool = require("../config/db");

// Create Exam
const createExam = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO exams
    (
      school_id,
      exam_name,
      exam_type,
      start_date,
      end_date,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.school_id,
      data.exam_name,
      data.exam_type,
      data.start_date,
      data.end_date,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All Exams
const getAllExams = async () => {

  const [rows] = await pool.query(
    `SELECT *
     FROM exams
     ORDER BY id DESC`
  );

  return rows;
};

// Get Exam By Id
const getExamById = async (id) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM exams
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Update Exam
const updateExam = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE exams
     SET
       exam_name = ?,
       exam_type = ?,
       start_date = ?,
       end_date = ?,
       updated_by = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      data.exam_name,
      data.exam_type,
      data.start_date,
      data.end_date,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Exam
const deleteExam = async (id) => {

  const [result] = await pool.query(
    `DELETE FROM exams
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
};