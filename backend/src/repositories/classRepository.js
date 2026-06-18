const pool = require("../config/db");

// Create Class
const createClass = async (classData) => {

  const [result] = await pool.query(
    `INSERT INTO classes
    (
      class_name,
      status,
      created_by
    )
    VALUES (?, ?, ?)`,
    [
      classData.class_name,
      classData.status,
      classData.created_by
    ]
  );

  return result;
};

// Get All Classes
const getAllClasses = async () => {

  const [rows] = await pool.query(
    `SELECT *
     FROM classes
     ORDER BY id DESC`
  );

  return rows;
};

// Get Class By Id
const getClassById = async (id) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM classes
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Update Class
const updateClass = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE classes
     SET class_name = ?,
         status = ?,
         updated_by = ?,
         updated_at = NOW()
     WHERE id = ?`,
    [
      data.class_name,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Class
const deleteClass = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM classes
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
};