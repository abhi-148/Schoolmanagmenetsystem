const pool = require("../config/db");

// Add Marks
const createStudentMark =
async (data) => {

  const [result] = await pool.query(
    `INSERT INTO student_marks
    (
      exam_id,
      student_id,
      subject_id,
      max_marks,
      obtained_marks,
      remarks,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.exam_id,
      data.student_id,
      data.subject_id,
      data.max_marks,
      data.obtained_marks,
      data.remarks,
      data.created_by
    ]
  );

  return result;
};

// Get All Marks
const getAllStudentMarks =
async () => {

  const [rows] = await pool.query(
    `
    SELECT
  sm.id,
  sm.exam_id,
  sm.student_id,
  sm.subject_id,
  e.exam_name,
  s.full_name,
  sub.subject_name,
  sm.max_marks,
  sm.obtained_marks,
  sm.remarks

    FROM student_marks sm

    JOIN exams e
      ON e.id = sm.exam_id

    JOIN student s
      ON s.id = sm.student_id

    JOIN subjects sub
      ON sub.id = sm.subject_id

    ORDER BY sm.id DESC
    `
  );

  return rows;
};

// Get By Student
const getMarksByStudent =
async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM student_marks
    WHERE student_id = ?
    `,
    [studentId]
  );

  return rows;
};

// Get By Exam
const getMarksByExam =
async (examId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM student_marks
    WHERE exam_id = ?
    `,
    [examId]
  );

  return rows;
};
const updateStudentMark = async (id, data) => {
  const [result] = await pool.query(
    `UPDATE student_marks
     SET
       exam_id=?,
       student_id=?,
       subject_id=?,
       max_marks=?,
       obtained_marks=?,
       remarks=?
     WHERE id=?`,
    [
      data.exam_id,
      data.student_id,
      data.subject_id,
      data.max_marks,
      data.obtained_marks,
      data.remarks,
      id
    ]
  );

  return result;
};

const deleteStudentMark = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM student_marks
     WHERE id=?`,
    [id]
  );

  return result;
};

module.exports = {
  createStudentMark,
  getAllStudentMarks,
  getMarksByStudent,
  getMarksByExam,
  updateStudentMark,
deleteStudentMark
};