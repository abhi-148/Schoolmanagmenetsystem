const pool = require("../config/db");

// Create Master Medium
const createMasterMedium = async (data) => {

const [result] = await pool.query(
`INSERT INTO tbl_master_mediums
(
  medium_name,
  description,
  requested_by_school_id,
  approval_status,
  status,
  created_by,
  approved_by,
  approved_at
)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
[
data.medium_name,
data.description,
data.requested_by_school_id || null,
data.approval_status,
data.status,
data.created_by,
data.approved_by || null,
data.approved_at || null
]
);

return result;
};

// Get All
const getAllMasterMediums = async () => {

const [rows] = await pool.query(
`SELECT *
     FROM tbl_master_mediums
     ORDER BY id DESC`
);

return rows;
};

// Get By Id
const getMasterMediumById = async (id) => {

const [rows] = await pool.query(
`SELECT *
     FROM tbl_master_mediums
     WHERE id = ?`,
[id]
);

return rows[0];
};

// Update
const updateMasterMedium = async (id, data) => {

const [result] = await pool.query(
`UPDATE tbl_master_mediums
     SET
       medium_name = ?,
       description = ?,
       updated_by = ?,
       updated_at = NOW()
     WHERE id = ?`,
[
data.medium_name,
data.description,
data.updated_by,
id
]
);

return result;
};

const checkMediumUsed =
  async (id) => {

  const [rows] =
    await pool.query(
      `
      SELECT *
      FROM tbl_school_mediums
      WHERE master_medium_id = ?
      `,
      [id]
    );

  return rows.length > 0;
};

// Delete
const deleteMasterMedium = async (id) => {

const [result] = await pool.query(
`DELETE FROM tbl_master_mediums
     WHERE id = ?`,
[id]
);

return result;
};
const checkMediumExists =
async (medium_name) => {

  const [rows] =
    await pool.query(
      `
      SELECT id
      FROM tbl_master_mediums
      WHERE medium_name = ?
      `,
      [medium_name]
    );

  return rows.length > 0;
};

module.exports = {
createMasterMedium,
getAllMasterMediums,
getMasterMediumById,
updateMasterMedium,
deleteMasterMedium,
checkMediumUsed,
checkMediumExists
};
