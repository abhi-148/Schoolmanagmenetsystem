const pool = require("../config/db");

// Create
const createSchoolPeriod = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_school_period
    (
      school_id,
      branch_id,
      period_number,
      start_time,
      end_time,
      slot_duration,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.school_id,
      data.branch_id,
      data.period_number,
      data.start_time,
      data.end_time,
      data.slot_duration,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All
// Get All School Periods
const getAllSchoolPeriods = async () => {

  const [rows] = await pool.query(
    `
    SELECT

      sp.period_id,

      sp.school_id,
      s.school_name,

      sp.branch_id,
      sb.branch_name,

      sp.period_number,

      sp.start_time,
      sp.end_time,

      sp.slot_duration,

      sp.status,

      sp.created_at

    FROM tbl_school_period sp

    INNER JOIN school s
      ON s.id = sp.school_id

    INNER JOIN school_branches sb
      ON sb.id = sp.branch_id

    ORDER BY
      sp.period_number ASC
    `
  );

  return rows;

};

// Get By Id
const getSchoolPeriodById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT

      sp.period_id,

      sp.school_id,
      s.school_name,

      sp.branch_id,
      sb.branch_name,

      sp.period_number,

      sp.start_time,
      sp.end_time,

      sp.slot_duration,

      sp.status,

      sp.created_at,
      sp.updated_at

    FROM tbl_school_period sp

    INNER JOIN school s
      ON s.id = sp.school_id

    INNER JOIN school_branches sb
      ON sb.id = sp.branch_id

    WHERE sp.period_id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update
// Update
const updateSchoolPeriod = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_period
    SET
      school_id = ?,
      branch_id = ?,
      period_number = ?,
      start_time = ?,
      end_time = ?,
      slot_duration = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE period_id = ?
    `,
    [
      data.school_id,
      data.branch_id,
      data.period_number,
      data.start_time,
      data.end_time,
      data.slot_duration,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;

};

// Delete
const deleteSchoolPeriod = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM tbl_school_period
    WHERE period_id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createSchoolPeriod,
  getAllSchoolPeriods,
  getSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod
};