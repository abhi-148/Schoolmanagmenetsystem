const pool = require("../config/db");

const createStaff = async (staffData) => {

  const [result] = await pool.query(
    `CALL sp_create_staff(
      ?, ?, ?, ?, ?, ?, ?
    )`,
    [
      staffData.school_id,
      staffData.full_name,
      staffData.email,
      staffData.designation,
      staffData.password,
      staffData.status,
      staffData.created_by || null
    ]
  );

  return result;
};

const getAllStaff = async () => {

  const [rows] = await pool.query(
    `SELECT
      id,
      school_id,
      full_name,
      email,
      role,
      designation,
      status,
      created_at
     FROM staff`
  );

  return rows;
};

const findStaffByEmail = async (
  email
) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM staff
     WHERE email = ?`,
    [email]
  );

  return rows[0];
};

const updateStaff = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE staff
     SET
       full_name = ?,
       email = ?,
       designation = ?,
       updated_by = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      data.full_name,
      data.email,
      data.designation,
      data.updated_by,
      id
    ]
  );

  return result;

};

const deleteStaff = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM staff
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createStaff,
  getAllStaff,
  findStaffByEmail,
  updateStaff,
  deleteStaff
};