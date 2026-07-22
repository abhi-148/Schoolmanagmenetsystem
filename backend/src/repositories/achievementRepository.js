const pool = require("../config/db");

// Create
const createAchievement = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_achievement (
      school_id,
      student_id,
      event_date,
      title,
      achievement_category,
      achievement_level,
      position_achieved,
      image_urls,
      certificate_url,
      status,
      created_by,
      updated_by,
      approved_by,
      issued_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.school_id,
      data.student_id,
      data.event_date,
      data.title,
      data.achievement_category,
      data.achievement_level,
      data.position_achieved,
      JSON.stringify(data.image_urls || []),
      data.certificate_url,
      data.status,
      data.created_by,
      data.updated_by,
      data.approved_by,
      data.issued_by
    ]
  );

  return result;

};

// Get All
const getAllAchievements = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      a.*,
      s.school_name,
      st.full_name AS student_name,
      c.full_name AS created_by_name,
      u.full_name AS updated_by_name,
      ap.full_name AS approved_by_name
    FROM tbl_achievement a

    LEFT JOIN school s
      ON a.school_id = s.id

    LEFT JOIN student st
      ON a.student_id = st.id

    LEFT JOIN staff c
      ON a.created_by = c.id

    LEFT JOIN staff u
      ON a.updated_by = u.id

    LEFT JOIN staff ap
      ON a.approved_by = ap.id

    ORDER BY a.id DESC
    `
  );

  return rows;

};

// Get By School
const getAchievementsBySchool = async (schoolId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement
    WHERE school_id = ?
    ORDER BY id DESC
    `,
    [schoolId]
  );

  return rows;

};

// Get By Id
const getAchievementById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT
      a.*,
      s.school_name,
      st.full_name AS student_name,
      c.full_name AS created_by_name,
      u.full_name AS updated_by_name,
      ap.full_name AS approved_by_name

    FROM tbl_achievement a

    LEFT JOIN school s
      ON a.school_id = s.id

    LEFT JOIN student st
      ON a.student_id = st.id

    LEFT JOIN staff c
      ON a.created_by = c.id

    LEFT JOIN staff u
      ON a.updated_by = u.id

    LEFT JOIN staff ap
      ON a.approved_by = ap.id

    WHERE a.id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update
const updateAchievement = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_achievement
    SET
      school_id = ?,
      student_id = ?,
      event_date = ?,
      title = ?,
      achievement_category = ?,
      achievement_level = ?,
      position_achieved = ?,
      image_urls = ?,
      certificate_url = ?,
      status = ?,
      updated_by = ?,
      approved_by = ?,
      issued_by = ?,
      updated_at = NOW()

    WHERE id = ?
    `,
    [
      data.school_id,
      data.student_id,
      data.event_date,
      data.title,
      data.achievement_category,
      data.achievement_level,
      data.position_achieved,
      JSON.stringify(data.image_urls || []),
      data.certificate_url,
      data.status,
      data.updated_by,
      data.approved_by,
      data.issued_by,
      id
    ]
  );

  return result;

};

// Delete
const deleteAchievement = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM tbl_achievement
    WHERE id = ?
    `,
    [id]
  );

  return result;

};

// Duplicate Check
const checkDuplicateAchievement = async (
  studentId,
  title
) => {

  const [rows] = await pool.query(
    `
    SELECT id
    FROM tbl_achievement
    WHERE student_id = ?
    AND title = ?
    `,
    [
      studentId,
      title
    ]
  );

  return rows;

};

// Search
const searchAchievement = async (keyword) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement

    WHERE
      title LIKE ?
      OR issued_by LIKE ?

    ORDER BY id DESC
    `,
    [
      `%${keyword}%`,
      `%${keyword}%`
    ]
  );

  return rows;

};

// Filter By Category
const getAchievementByCategory = async (category) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement
    WHERE achievement_category = ?
    ORDER BY id DESC
    `,
    [category]
  );

  return rows;

};

// Filter By Level
const getAchievementByLevel = async (level) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement
    WHERE achievement_level = ?
    ORDER BY id DESC
    `,
    [level]
  );

  return rows;

};

// Filter By Student
const getAchievementByStudent = async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement
    WHERE student_id = ?
    ORDER BY id DESC
    `,
    [studentId]
  );

  return rows;

};

// Filter By Status
const getAchievementByStatus = async (status) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_achievement
    WHERE status = ?
    ORDER BY id DESC
    `,
    [status]
  );

  return rows;

};

module.exports = {
  createAchievement,
  getAllAchievements,
  getAchievementsBySchool,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  checkDuplicateAchievement,
  searchAchievement,
  getAchievementByCategory,
  getAchievementByLevel,
  getAchievementByStudent,
  getAchievementByStatus
};