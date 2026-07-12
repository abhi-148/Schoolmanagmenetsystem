const pool = require("../config/db");

// Create Section
const createSection = async (
  sectionData
) => {

  const [result] = await pool.query(
    `INSERT INTO sections
    (
      school_class_id,
      section_name,
      capacity,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      sectionData.school_class_id,
      sectionData.section_name,
      sectionData.capacity,
      sectionData.status,
      sectionData.created_by
    ]
  );

  return result;
};

// Get All Sections
const getAllSections = async () => {

  const [rows] = await pool.query(
    `SELECT
      s.*,
      c.class_name
     FROM sections s
     JOIN school_classes sc
       ON sc.id = s.school_class_id
     JOIN classes c
       ON c.id = sc.class_id
     ORDER BY s.id DESC`
  );

  return rows;
};

// Get Section By Id
const getSectionById = async (
  id
) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM sections
     WHERE id = ?`,
    [id]
  );

  return rows[0];
};
const getSectionSchoolClass = async (
  schoolClassId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      id,
      school_id
    FROM school_classes
    WHERE id = ?
    `,
    [schoolClassId]
  );

  return rows[0];

};

// Get Sections By Class
const getSectionsByClass =
async (schoolClassId) => {

  const [rows] = await pool.query(
    `SELECT *
     FROM sections
     WHERE school_class_id = ?`,
    [schoolClassId]
  );

  return rows;
};

// Delete Section
const deleteSection = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM sections
     WHERE id = ?`,
    [id]
  );

  return result;
};

const deleteSectionBySchool = async (
  id,
  schoolId
) => {

  const [result] = await pool.query(
    `
    DELETE s
    FROM sections s

    JOIN school_classes sc
      ON sc.id = s.school_class_id

    WHERE
      s.id = ?
      AND sc.school_id = ?
    `,
    [
      id,
      schoolId
    ]
  );

  return result;

};

const getSectionsBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.*,
      c.class_name

    FROM sections s

    JOIN school_classes sc
      ON sc.id = s.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    WHERE sc.school_id = ?

    ORDER BY s.id DESC
    `,
    [schoolId]
  );

  return rows;

};
const getSectionByIdAndSchool = async (
  id,
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.*,
      sc.school_id

    FROM sections s

    JOIN school_classes sc
      ON sc.id = s.school_class_id

    WHERE
      s.id = ?
      AND sc.school_id = ?
    `,
    [
      id,
      schoolId
    ]
  );

  return rows[0];

};
const getSectionsByClassAndSchool = async (
  schoolClassId,
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.*

    FROM sections s

    JOIN school_classes sc
      ON sc.id = s.school_class_id

    WHERE
      s.school_class_id = ?
      AND sc.school_id = ?

    ORDER BY s.id DESC
    `,
    [
      schoolClassId,
      schoolId
    ]
  );

  return rows;

};

module.exports = {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsBySchool,
  getSectionByIdAndSchool,
  getSectionsByClass,
  getSectionSchoolClass,
  deleteSection,
  deleteSectionBySchool,
  getSectionsByClassAndSchool
};