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

module.exports = {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsByClass,
  deleteSection
};