const pool = require("../config/db");

const createStudent = async (studentData) => {

  const [result] = await pool.query(
    `INSERT INTO student
    (
      school_id,
      full_name,
      roll_number,
      class_name,
      section,
      gender,
      dob,
      father_name,
      mother_name,
      phone,
      address,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      studentData.school_id,
      studentData.full_name,
      studentData.roll_number,
      studentData.class_name,
      studentData.section,
      studentData.gender,
      studentData.dob,
      studentData.father_name,
      studentData.mother_name,
      studentData.phone,
      studentData.address,
      studentData.status
    ]
  );

  return result;
};

const getAllStudents = async () => {

  const [rows] = await pool.query(
    `SELECT * FROM student`
  );

  return rows;
};

const getStudentById = async (id) => {

  const [rows] = await pool.query(
    `SELECT * FROM student
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

const updateStudent = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE student
     SET
       full_name = ?,
       class_name = ?,
       section = ?,
       phone = ?,
       address = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      data.full_name,
      data.class_name,
      data.section,
      data.phone,
      data.address,
      id
    ]
  );

  return result;
};

const updateStudentStatus = async (
  id,
  status
) => {

  const [result] = await pool.query(
    `UPDATE student
     SET status = ?
     WHERE id = ?`,
    [status, id]
  );

  return result;
};

const getStudentsWithPagination = async (
  limit,
  offset
) => {

  const [rows] = await pool.query(
    `SELECT * FROM student
     LIMIT ? OFFSET ?`,
    [
      Number(limit),
      Number(offset)
    ]
  );

  return rows;
};

const searchStudents = async (
  search
) => {

  const [rows] = await pool.query(
    `SELECT * FROM student
     WHERE full_name LIKE ?`,
    [`%${search}%`]
  );

  return rows;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents
};