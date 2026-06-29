const pool = require("../config/db");

// Create
const createTimeTableSubstitution = async (
  data
) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_time_table_substitutions
    (
      time_table_id,
      original_teacher_id,
      substitute_teacher_id,
      substitution_date,
      reason,
      remark,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.time_table_id,
      data.original_teacher_id,
      data.substitute_teacher_id,
      data.substitution_date,
      data.reason,
      data.remark,
      data.status,
      data.created_by
    ]
  );

  return result;

};

// Get All
const getAllTimeTableSubstitutions =
async () => {

  const [rows] = await pool.query(
    `
    SELECT
      tts.substitution_id,
      tts.substitution_date,
      tts.reason,
      tts.remark,
      tts.status,

      tt.day_of_week,

      ot.full_name AS original_teacher,

      st.full_name AS substitute_teacher

    FROM tbl_time_table_substitutions tts

    JOIN tbl_time_table tt
      ON tt.time_table_id =
      tts.time_table_id

    JOIN staff ot
      ON ot.id =
      tts.original_teacher_id

    JOIN staff st
      ON st.id =
      tts.substitute_teacher_id

    ORDER BY
      tts.substitution_id DESC
    `
  );

  return rows;

};

// Get By Id
const getTimeTableSubstitutionById =
async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_time_table_substitutions
    WHERE substitution_id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update
const updateTimeTableSubstitution =
async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_time_table_substitutions
    SET
      substitute_teacher_id = ?,
      substitution_date = ?,
      reason = ?,
      remark = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE substitution_id = ?
    `,
    [
      data.substitute_teacher_id,
      data.substitution_date,
      data.reason,
      data.remark,
      data.updated_by,
      id
    ]
  );

  return result;

};

// Delete
const deleteTimeTableSubstitution =
async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM
    tbl_time_table_substitutions
    WHERE substitution_id = ?
    `,
    [id]
  );

  return result;

};

module.exports = {
  createTimeTableSubstitution,
  getAllTimeTableSubstitutions,
  getTimeTableSubstitutionById,
  updateTimeTableSubstitution,
  deleteTimeTableSubstitution
};