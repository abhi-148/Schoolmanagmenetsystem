const pool = require("../config/db");

// Create Branch
const createSchoolBranch = async (
  branchData
) => {

  const [result] = await pool.query(
    `INSERT INTO school_branches
    (
      school_id,
      branch_name,
      branch_code,
      address,
      contact_person,
      contact_number,
      branch_email,
      principal_name,
      is_main_branch,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      branchData.school_id,
      branchData.branch_name,
      branchData.branch_code,
      branchData.address,
      branchData.contact_person,
      branchData.contact_number,
      branchData.branch_email,
      branchData.principal_name,
      branchData.is_main_branch,
      branchData.status,
      branchData.created_by
    ]
  );

  return result;
};

// Get All Branches
const getAllSchoolBranches =
async (user) => {

  let query = `
    SELECT *
    FROM school_branches
  `;

  let params = [];

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    query += `
      WHERE school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }

  query += `
    ORDER BY id DESC
  `;

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;

};

// Get Branch By Id
const getSchoolBranchById =
async (id) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM school_branches
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Get Branches By School
const getBranchesBySchool =
async (schoolId) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM school_branches
     WHERE school_id = ?`,
    [schoolId]
  );

  return rows;
};

// Update Branch
const updateSchoolBranch =
async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE school_branches
     SET
      branch_name = ?,
      address = ?,
      contact_person = ?,
      contact_number = ?,
      principal_name = ?,
      updated_by = ?,
      updated_at = NOW()
     WHERE id = ?`,
    [
      data.branch_name,
      data.address,
      data.contact_person,
      data.contact_number,
      data.principal_name,
      data.updated_by,
      id
    ]
  );

  return result;
};
const updateSchoolBranchBySchool =
async (
  id,
  data,
  schoolId
) => {

  const [result] = await pool.query(
    `
    UPDATE school_branches
    SET
      branch_name = ?,
      address = ?,
      contact_person = ?,
      contact_number = ?,
      principal_name = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE
      id = ?
      AND school_id = ?
    `,
    [
      data.branch_name,
      data.address,
      data.contact_person,
      data.contact_number,
      data.principal_name,
      data.updated_by,
      id,
      schoolId
    ]
  );

  return result;

};

// Delete Branch
const deleteSchoolBranch =
async (id) => {

  const [result] = await pool.query(
    `DELETE FROM school_branches
     WHERE id = ?`,
    [id]
  );

  return result;
};
const deleteSchoolBranchBySchool =
async (
  id,
  schoolId
) => {

  const [result] = await pool.query(
    `
    DELETE FROM school_branches
    WHERE
      id = ?
      AND school_id = ?
    `,
    [
      id,
      schoolId
    ]
  );

  return result;

};
module.exports = {
  createSchoolBranch,
  getAllSchoolBranches,
  getSchoolBranchById,
  getBranchesBySchool,
  updateSchoolBranch,
  updateSchoolBranchBySchool,
deleteSchoolBranchBySchool,
  deleteSchoolBranch
};