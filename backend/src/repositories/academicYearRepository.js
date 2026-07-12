const pool = require("../config/db");

// Create
const createAcademicYear = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO academic_years
    (
      academic_year_name,
      start_date,
      end_date,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      data.academic_year_name,
      data.start_date,
      data.end_date,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All
const getAllAcademicYears = async () => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM academic_years
    ORDER BY id DESC
    `
  );

  return rows;
};

// Get By Id
const getAcademicYearById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM academic_years
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

// Update
const updateAcademicYear = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE academic_years
    SET
      academic_year_name = ?,
      start_date = ?,
      end_date = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.academic_year_name,
      data.start_date,
      data.end_date,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete
const deleteAcademicYear = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM academic_years
    WHERE id = ?
    `,
    [id]
  );

  return result;
};
// Get Academic Years By School
const getAcademicYearsBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM academic_years
    WHERE school_id = ?
    ORDER BY id DESC
    `,
    [schoolId]
  );

  return rows;

};
module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearsBySchool,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear
};