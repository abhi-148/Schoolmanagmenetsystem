const pool = require("../config/db");

// Create School Class
const createSchoolClass = async (classData) => {

  const [result] = await pool.query(
    `
    INSERT INTO school_classes
    (
      school_id,
      class_id,
      branch_id,
      location,
      student_capacity,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      classData.school_id,
      classData.class_id,
      classData.branch_id,
      classData.location,
      classData.student_capacity,
      classData.status,
      classData.created_by
    ]
  );

  return result;

};

// Get All School Classes
const getAllSchoolClasses = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      sc.id,

      s.school_name,

      sb.branch_name,

      c.class_name,

      sc.location,
      sc.student_capacity,
      sc.status,

      sc.school_id,
      sc.branch_id,
      sc.class_id

    FROM school_classes sc

    JOIN school s
      ON s.id = sc.school_id

    JOIN school_branches sb
      ON sb.id = sc.branch_id

    JOIN classes c
      ON c.id = sc.class_id

    ORDER BY sc.id DESC
    `
  );

  return rows;

};

// Get School Class By Id
const getSchoolClassById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM school_classes
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];

};

// Get School Classes By Branch
const getSchoolClassesByBranch = async (branchId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM school_classes
    WHERE branch_id = ?
    ORDER BY id DESC
    `,
    [branchId]
  );

  return rows;

};

// Update School Class
const updateSchoolClass = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE school_classes
    SET
      school_id = ?,
      class_id = ?,
      branch_id = ?,
      location = ?,
      student_capacity = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.school_id,
      data.class_id,
      data.branch_id,
      data.location,
      data.student_capacity,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;

};
const updateSchoolClassBySchool = async (
  id,
  data,
  schoolId
) => {

  const [result] = await pool.query(
    `
    UPDATE school_classes
    SET
      class_id = ?,
      branch_id = ?,
      location = ?,
      student_capacity = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE
      id = ?
      AND school_id = ?
    `,
    [
      data.class_id,
      data.branch_id,
      data.location,
      data.student_capacity,
      data.status,
      data.updated_by,
      id,
      schoolId
    ]
  );

  return result;

};

// Delete School Class
const deleteSchoolClass = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM school_classes
    WHERE id = ?
    `,
    [id]
  );

  return result;

};
const deleteSchoolClassBySchool = async (
  id,
  schoolId
) => {

  const [result] = await pool.query(
    `
    DELETE FROM school_classes
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
// Get School Classes By School
const getSchoolClassesBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      sc.id,

      s.school_name,

      sb.branch_name,

      c.class_name,

      sc.location,
      sc.student_capacity,
      sc.status,

      sc.school_id,
      sc.branch_id,
      sc.class_id

    FROM school_classes sc

    JOIN school s
      ON s.id = sc.school_id

    JOIN school_branches sb
      ON sb.id = sc.branch_id

    JOIN classes c
      ON c.id = sc.class_id

    WHERE sc.school_id = ?

    ORDER BY sc.id DESC
    `,
    [schoolId]
  );

  return rows;

};
module.exports = {
  createSchoolClass,
  getAllSchoolClasses,
  getSchoolClassesBySchool,
  getSchoolClassById,
  getSchoolClassesByBranch,
  updateSchoolClass,
  updateSchoolClassBySchool,
deleteSchoolClassBySchool,
  deleteSchoolClass
};