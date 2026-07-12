const pool = require("../config/db");

const createSchool = async (schoolData) => {

  const [result] = await pool.query(
    `CALL sp_create_school(
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )`,
    [
      schoolData.school_name,
      schoolData.school_code,
      schoolData.email,
      schoolData.phone,
      schoolData.address,
      schoolData.admin_name,
      schoolData.admin_email,
      schoolData.admin_password,
      schoolData.status,
      schoolData.created_by || null
    ]
  );

  return result;
};

const getAllSchools = async () => {

  const [rows] = await pool.query(
    `SELECT
      id,
      school_name,
      school_code,
      email,
      phone,
      address,
      admin_name,
      admin_email,
      status,
      created_at,
      updated_at
     FROM school`
  );

  return rows;
};

const getSchoolById = async (id) => {

  const [rows] = await pool.query(
    `SELECT
      id,
      school_name,
      school_code,
      email,
      phone,
      address,
      admin_name,
      admin_email,
      status,
      created_at,
      updated_at
     FROM school
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

const updateSchool = async (id, data) => {

  const [result] = await pool.query(
    `UPDATE school
     SET school_name = ?,
         phone = ?,
         address = ?,
         updated_at = NOW()
     WHERE id = ?`,
    [
      data.school_name,
      data.phone,
      data.address,
      id
    ]
  );

  return result;
};

const findSchoolAdminByEmail = async (email) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM school
     WHERE admin_email = ?`,
    [email]
  );

  return rows[0];
};
const deleteSchool = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM school
     WHERE id = ?`,
    [id]
  );

  return result;
};
const findSchoolAdminById = async (
  id
) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM school
     WHERE id = ?`,
    [id]
  );

  return rows[0];

};

const updateSchoolAdminPassword = async (
  id,
  password
) => {

  const [result] = await pool.query(
    `UPDATE school
     SET admin_password = ?
     WHERE id = ?`,
    [
      password,
      id
    ]
  );

  return result;

};
const getSchoolAdminProfile = async (
  id
) => {

  const [rows] = await pool.query(
    `SELECT
      id,
      school_name,
      school_code,
      admin_name,
      admin_email,
      phone,
      address,
      status
     FROM school
     WHERE id = ?`,
    [id]
  );

  return rows[0];

};

const updateSchoolAdminProfile = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE school
     SET
       admin_name = ?,
       admin_email = ?,
       phone = ?,
       address = ?,
       updated_at = NOW()
     WHERE id = ?`,
    [
      data.admin_name,
      data.admin_email,
      data.phone,
      data.address,
      id
    ]
  );

  return result;

};

module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  findSchoolAdminByEmail,
  deleteSchool,
  updateSchoolAdminPassword,
  getSchoolAdminProfile,
updateSchoolAdminProfile,
findSchoolAdminById,
};