const pool = require("../config/db");

// Create Batch
const createBatch = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_batches
    (
      batch_code,
      school_class_id,
      academic_year_id,
      section_id,
      teacher_id,
      school_medium_id,
      start_time,
      end_time,
      duration_minutes,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.batch_code,
      data.school_class_id,
      data.academic_year_id,
      data.section_id,
      data.teacher_id,
      data.school_medium_id,
      data.start_time,
      data.end_time,
      data.duration_minutes,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Check Duplicate
const findBatchDuplicate = async (
  school_class_id,
  section_id,
  academic_year_id
) => {

  const [rows] = await pool.query(
    `
    SELECT batch_id
    FROM tbl_batches
    WHERE school_class_id = ?
      AND section_id = ?
      AND academic_year_id = ?
    `,
    [
      school_class_id,
      section_id,
      academic_year_id
    ]
  );

  return rows[0];
};

// Get All
const getAllBatches = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      b.batch_id,
      b.batch_code,

      c.class_name,
      sec.section_name,

      ay.academic_year_name,

      st.full_name AS teacher_name,

      sm.custom_medium_name,

      b.start_time,
      b.end_time,
      b.duration_minutes,

      b.status

    FROM tbl_batches b

    JOIN school_classes sc
      ON sc.id = b.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    JOIN sections sec
      ON sec.id = b.section_id

    JOIN academic_years ay
      ON ay.id = b.academic_year_id

    JOIN staff st
      ON st.id = b.teacher_id

    JOIN tbl_school_mediums sm
      ON sm.id = b.school_medium_id

    ORDER BY b.batch_id DESC
    `
  );

  return rows;
};

// Get By Id
// Get By Id
const getBatchById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT

      b.*,

      c.class_name,

      sec.section_name,

      ay.academic_year_name,

      st.full_name AS teacher_name,

      sm.custom_medium_name

    FROM tbl_batches b

    JOIN school_classes sc
      ON sc.id = b.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    JOIN sections sec
      ON sec.id = b.section_id

    JOIN academic_years ay
      ON ay.id = b.academic_year_id

    JOIN staff st
      ON st.id = b.teacher_id

    JOIN tbl_school_mediums sm
      ON sm.id = b.school_medium_id

    WHERE b.batch_id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update
const updateBatch = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_batches
    SET
      batch_code = ?,
      school_class_id = ?,
      academic_year_id = ?,
      section_id = ?,
      teacher_id = ?,
      school_medium_id = ?,
      start_time = ?,
      end_time = ?,
      duration_minutes = ?,
      status = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE batch_id = ?
    `,
    [
      data.batch_code,
      data.school_class_id,
      data.academic_year_id,
      data.section_id,
      data.teacher_id,
      data.school_medium_id,
      data.start_time,
      data.end_time,
      data.duration_minutes,
      data.status,
      data.updated_by,
      id
    ]
  );

  return result;

};

// Delete
const deleteBatch = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM tbl_batches
    WHERE batch_id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createBatch,
  findBatchDuplicate,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch
};