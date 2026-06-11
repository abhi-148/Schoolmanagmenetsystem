const pool = require("../config/db");

const getProfile = async (schoolId) => {

  const [rows] = await pool.query(
    `SELECT
  id,
  admin_name AS full_name,
  admin_email AS email,
  status
FROM school
WHERE id = ?`,
    [schoolId]
  );

  return rows[0];
};

const updateProfile = async (
  schoolId,
  full_name,
  email
) => {

  const [result] = await pool.query(
    `UPDATE school
     SET admin_name = ?,
         admin_email = ?
     WHERE id = ?`,
    [
      full_name,
      email,
      schoolId
    ]
  );

  return result;
};

module.exports = {
  getProfile,
  updateProfile
};