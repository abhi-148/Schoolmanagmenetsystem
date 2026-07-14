const pool = require("../config/db");

// Create Lost And Found
const createLostAndFound = async (
  itemData
) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_lost_and_found
    (
      school_id,
      branch_id,
      item_name,
      category,
      description,
      location_found,
      found_datetime,
      found_by_staff_id,
      found_by_student_id,
      status,
      claimed_datetime,
      claimed_by_staff_id,
      claimed_by_student_id,
      record_status,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      itemData.school_id,
      itemData.branch_id,
      itemData.item_name,
      itemData.category,
      itemData.description,
      itemData.location_found,
      itemData.found_datetime,
      itemData.found_by_staff_id,
      itemData.found_by_student_id,
      itemData.status,
      itemData.claimed_datetime,
      itemData.claimed_by_staff_id,
      itemData.claimed_by_student_id,
      itemData.record_status,
      itemData.created_by,
      itemData.updated_by
    ]
  );

  return result;

};

// Get All Lost And Found
const getAllLostAndFound = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      l.*,

      sc.school_name,

      sb.branch_name,

      fs.full_name AS found_by_staff_name,

      fst.full_name AS found_by_student_name,

      cs.full_name AS claimed_by_staff_name,

      cst.full_name AS claimed_by_student_name,

      cb.full_name AS created_by_name,

      ub.full_name AS updated_by_name

    FROM tbl_lost_and_found l

    LEFT JOIN school sc
      ON l.school_id = sc.id

    LEFT JOIN school_branches sb
      ON l.branch_id = sb.id

    LEFT JOIN staff fs
      ON l.found_by_staff_id = fs.id

    LEFT JOIN student fst
      ON l.found_by_student_id = fst.id

    LEFT JOIN staff cs
      ON l.claimed_by_staff_id = cs.id

    LEFT JOIN student cst
      ON l.claimed_by_student_id = cst.id

    LEFT JOIN staff cb
      ON l.created_by = cb.id

    LEFT JOIN staff ub
      ON l.updated_by = ub.id

    ORDER BY l.item_id DESC
    `
  );

  return rows;

};
// Get Lost And Found By Id
const getLostAndFoundById = async (
  id
) => {

  const [rows] = await pool.query(
    `
    SELECT
      l.*,

      sc.school_name,

      sb.branch_name,

      fs.full_name AS found_by_staff_name,

      fst.full_name AS found_by_student_name,

      cs.full_name AS claimed_by_staff_name,

      cst.full_name AS claimed_by_student_name,

      cb.full_name AS created_by_name,

      ub.full_name AS updated_by_name

    FROM tbl_lost_and_found l

    LEFT JOIN school sc
      ON l.school_id = sc.id

    LEFT JOIN school_branches sb
      ON l.branch_id = sb.id

    LEFT JOIN staff fs
      ON l.found_by_staff_id = fs.id

    LEFT JOIN student fst
      ON l.found_by_student_id = fst.id

    LEFT JOIN staff cs
      ON l.claimed_by_staff_id = cs.id

    LEFT JOIN student cst
      ON l.claimed_by_student_id = cst.id

    LEFT JOIN staff cb
      ON l.created_by = cb.id

    LEFT JOIN staff ub
      ON l.updated_by = ub.id

    WHERE l.item_id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update Lost And Found
const updateLostAndFound = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_lost_and_found
    SET
      school_id = ?,
      branch_id = ?,
      item_name = ?,
      category = ?,
      description = ?,
      location_found = ?,
      found_datetime = ?,
      found_by_staff_id = ?,
      found_by_student_id = ?,
      status = ?,
      claimed_datetime = ?,
      claimed_by_staff_id = ?,
      claimed_by_student_id = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE item_id = ?
    `,
    [
      data.school_id,
      data.branch_id,
      data.item_name,
      data.category,
      data.description,
      data.location_found,
      data.found_datetime,
      data.found_by_staff_id,
      data.found_by_student_id,
      data.status,
      data.claimed_datetime,
      data.claimed_by_staff_id,
      data.claimed_by_student_id,
      data.updated_by,
      id
    ]
  );

  return result;

};

// Update Record Status
const updateLostAndFoundStatus = async (
  id,
  recordStatus
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_lost_and_found
    SET
      record_status = ?,
      updated_at = NOW()
    WHERE item_id = ?
    `,
    [
      recordStatus,
      id
    ]
  );

  return result;

};

// Pagination
const getLostAndFoundWithPagination =
async (
  limit,
  offset
) => {

  const [rows] = await pool.query(
    `
    SELECT
      l.*,

      sc.school_name,

      sb.branch_name,

      fs.full_name AS found_by_staff_name,

      fst.full_name AS found_by_student_name,

      cs.full_name AS claimed_by_staff_name,

      cst.full_name AS claimed_by_student_name

    FROM tbl_lost_and_found l

    LEFT JOIN school sc
      ON l.school_id = sc.id

    LEFT JOIN school_branches sb
      ON l.branch_id = sb.id

    LEFT JOIN staff fs
      ON l.found_by_staff_id = fs.id

    LEFT JOIN student fst
      ON l.found_by_student_id = fst.id

    LEFT JOIN staff cs
      ON l.claimed_by_staff_id = cs.id

    LEFT JOIN student cst
      ON l.claimed_by_student_id = cst.id

    ORDER BY l.item_id DESC

    LIMIT ? OFFSET ?
    `,
    [
      Number(limit),
      Number(offset)
    ]
  );

  return rows;

};
// Search
const searchLostAndFound = async (
  search
) => {

  const [rows] = await pool.query(
    `
    SELECT
      l.*,

      sc.school_name,

      sb.branch_name,

      fs.full_name AS found_by_staff_name,

      fst.full_name AS found_by_student_name,

      cs.full_name AS claimed_by_staff_name,

      cst.full_name AS claimed_by_student_name

    FROM tbl_lost_and_found l

    LEFT JOIN school sc
      ON l.school_id = sc.id

    LEFT JOIN school_branches sb
      ON l.branch_id = sb.id

    LEFT JOIN staff fs
      ON l.found_by_staff_id = fs.id

    LEFT JOIN student fst
      ON l.found_by_student_id = fst.id

    LEFT JOIN staff cs
      ON l.claimed_by_staff_id = cs.id

    LEFT JOIN student cst
      ON l.claimed_by_student_id = cst.id

    WHERE

      l.item_name LIKE ?

      OR l.category LIKE ?

      OR l.location_found LIKE ?

      OR sb.branch_name LIKE ?

      OR sc.school_name LIKE ?

    ORDER BY l.item_id DESC
    `,
    [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    ]
  );

  return rows;

};

module.exports = {
  createLostAndFound,
  getAllLostAndFound,
  getLostAndFoundById,
  updateLostAndFound,
  updateLostAndFoundStatus,
  getLostAndFoundWithPagination,
  searchLostAndFound
};