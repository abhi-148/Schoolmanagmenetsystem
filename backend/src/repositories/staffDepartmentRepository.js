const pool = require("../config/db");

const createDepartment = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO staff_department
    (
      name,
      description,
      logo,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description,
      data.logo,
      data.status,
      data.created_by
    ]
  );

  return result;
};

const getAllDepartments = async () => {

  const [rows] = await pool.query(
    `SELECT *
     FROM staff_department
     ORDER BY id DESC`
  );

  return rows;
};

const updateDepartment = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE staff_department
     SET
     name = ?,
     description = ?,
     logo = ?,
     updated_by = ?,
     updated_at = NOW()
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.logo,
      data.updated_by,
      id
    ]
  );

  return result;
};

const deleteDepartment = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM staff_department
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
};