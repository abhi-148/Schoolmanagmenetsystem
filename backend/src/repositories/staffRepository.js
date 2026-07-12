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

// Find Staff By Id
const findStaffById = async (id) => {

  const [rows] = await pool.query(
    `SELECT
      id,
      school_id,
      full_name,
      email,
      role,
      designation,
      phone,
      status,
      created_at,
      updated_at
     FROM staff
     WHERE id = ?`,
    [id]
  );

  return rows[0];

};

// Get Staff Password
const getStaffPasswordById = async (id) => {

  const [rows] = await pool.query(
    `SELECT
      id,
      password
     FROM staff
     WHERE id = ?`,
    [id]
  );

  return rows[0];

};

// Update Staff Password
const updateStaffPassword = async (
  id,
  password
) => {

  const [result] = await pool.query(
    `UPDATE staff
     SET
       password = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      password,
      id
    ]
  );

  return result;

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
const getStaffBySchool = async (
  schoolId
) => {

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
     FROM staff
     WHERE school_id = ?`,
    [schoolId]
  );

  return rows;

};

// Update Staff School
const updateStaffSchool = async (
  staffId,
  schoolId
) => {

  const [result] = await pool.query(
    `
    UPDATE staff
    SET
      school_id = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      schoolId,
      staffId
    ]
  );

  return result;

};

// Update Staff Branch
const updateStaffBranch = async (
  staffId,
  branchId
) => {

  const [result] = await pool.query(
    `
    UPDATE staff
    SET
      branch_id = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      branchId,
      staffId
    ]
  );

  return result;

};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffBySchool,
  findStaffByEmail,
  findStaffById,
  getStaffPasswordById,
  updateStaffPassword,
  updateStaff,
  deleteStaff,
  updateStaffSchool,
  updateStaffBranch
};