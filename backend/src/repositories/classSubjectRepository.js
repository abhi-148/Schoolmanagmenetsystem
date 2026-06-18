const pool = require("../config/db");

// Create Mapping
const createClassSubject = async (
  data
) => {

  const [result] = await pool.query(
    `INSERT INTO class_subjects
    (
      school_class_id,
      subject_id,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?)`,
    [
      data.school_class_id,
      data.subject_id,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All Mappings
const getAllClassSubjects =
async () => {

  const [rows] = await pool.query(
    `
    SELECT
      cs.id,
      cs.school_class_id,
      c.class_name,
      s.subject_name,
      s.subject_code,
      cs.status

    FROM class_subjects cs

    JOIN school_classes sc
      ON sc.id = cs.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    JOIN subjects s
      ON s.id = cs.subject_id

    ORDER BY cs.id DESC
    `
  );

  return rows;
};

// Get By Class
const getSubjectsByClass =
async (schoolClassId) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.id,
      s.subject_name,
      s.subject_code

    FROM class_subjects cs

    JOIN subjects s
      ON s.id = cs.subject_id

    WHERE cs.school_class_id = ?
    `,
    [schoolClassId]
  );

  return rows;
};

// Delete Mapping
const deleteClassSubject =
async (id) => {

  const [result] = await pool.query(
    `DELETE FROM class_subjects
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createClassSubject,
  getAllClassSubjects,
  getSubjectsByClass,
  deleteClassSubject
};