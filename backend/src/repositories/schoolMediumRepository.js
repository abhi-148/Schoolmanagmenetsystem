const pool = require("../config/db");

// Create School Medium
const createSchoolMedium = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO tbl_school_mediums
    (
      school_id,
      master_medium_id,
      custom_medium_name,
      approval_status,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.school_id,
      data.master_medium_id || null,
      data.custom_medium_name || null,
      data.approval_status,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All
const getAllSchoolMediums = async () => {

  const [rows] = await pool.query(`
SELECT
  sm.*,
  mm.medium_name,
  s.school_name
FROM tbl_school_mediums sm
LEFT JOIN tbl_master_mediums mm
ON sm.master_medium_id = mm.id
LEFT JOIN school s
ON sm.school_id = s.id
ORDER BY sm.id DESC
`);

  return rows;
};

// Get By Id
const getSchoolMediumById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT
      sm.*,
      mm.medium_name
    FROM tbl_school_mediums sm
    LEFT JOIN tbl_master_mediums mm
      ON sm.master_medium_id = mm.id
    WHERE sm.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Update
const updateSchoolMedium = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_mediums
    SET
      master_medium_id = ?,
      custom_medium_name = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.master_medium_id,
      data.custom_medium_name,
      data.updated_by,
      id
    ]
  );

  return result;
};
// Get Pending School Medium By Id
const getPendingSchoolMediumById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_mediums
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

const createMasterMediumFromRequest = async (
  medium_name,
  school_id,
  approved_by
) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_master_mediums
    (
      medium_name,
      requested_by_school_id,
      approval_status,
      status,
      created_by,
      approved_by,
      approved_at
    )
    VALUES
    (
      ?,
      ?,
      'approved',
      'active',
      ?,
      ?,
      NOW()
    )
    `,
    [
      medium_name,
      school_id,
      approved_by,
      approved_by
    ]
  );

  return result;

};

// Update School Medium Master Medium Id
const updateSchoolMediumMasterMedium = async (
  schoolMediumId,
  masterMediumId
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_mediums
    SET master_medium_id = ?
    WHERE id = ?
    `,
    [
      masterMediumId,
      schoolMediumId
    ]
  );

  return result;
};

const deleteSchoolMedium = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM tbl_school_mediums
    WHERE id = ?
    `,
    [id]
  );

  return result;

};

const getSchoolMediumsBySchoolId = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      sm.id,
      sm.school_id,
      sm.master_medium_id,
      mm.medium_name
    FROM tbl_school_mediums sm
    INNER JOIN tbl_master_mediums mm
      ON sm.master_medium_id = mm.id
    WHERE sm.school_id = ?
    AND sm.approval_status = 'approved'
    AND sm.status = 'active'
    `,
    [schoolId]
  );

  return rows;
};


// Approve
const approveSchoolMedium = async (
  id,
  approved_by
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_mediums
    SET
      approval_status = 'approved',
      approved_by = ?,
      approved_at = NOW()
    WHERE id = ?
    `,
    [approved_by, id]
  );

  return result;
};

// Reject
const rejectSchoolMedium = async (
  id,
  approved_by
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_mediums
    SET
      approval_status = 'rejected',
      approved_by = ?,
      approved_at = NOW()
    WHERE id = ?
    `,
    [approved_by, id]
  );

  return result;
};

const checkSchoolMediumExists =
async (
  school_id,
  master_medium_id
) => {

  const [rows] =
    await pool.query(
      `
      SELECT id
      FROM tbl_school_mediums
      WHERE school_id = ?
      AND master_medium_id = ?
      `,
      [
        school_id,
        master_medium_id
      ]
    );

  return rows.length > 0;

};

module.exports = {
  createSchoolMedium,
  getAllSchoolMediums,
  getSchoolMediumById,
  updateSchoolMedium,
  approveSchoolMedium,
  rejectSchoolMedium,
  getPendingSchoolMediumById,
  createMasterMediumFromRequest,
  updateSchoolMediumMasterMedium,
  getSchoolMediumsBySchoolId,
  deleteSchoolMedium,
  checkSchoolMediumExists
};