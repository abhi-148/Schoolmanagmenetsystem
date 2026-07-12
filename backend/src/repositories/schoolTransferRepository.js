const pool = require("../config/db");

// Create School Transfer
const createSchoolTransfer = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_school_transfers
    (
      student_id,
      staff_id,
      from_school_id,
      to_school_id,
      from_batch_id,
      to_batch_id,
      academic_year_id,
      transfer_date,
      reason,
      remarks,
      requested_by_student_id,
      requested_by_staff_id,
      approved_by_staff_id,
      approved_at,
      transfer_status,
      status,
      created_by_student_id,
      created_by_staff_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.student_id,
      data.staff_id,
      data.from_school_id,
      data.to_school_id,
      data.from_batch_id,
      data.to_batch_id,
      data.academic_year_id,
      data.transfer_date,
      data.reason,
      data.remarks,
      data.requested_by_student_id,
      data.requested_by_staff_id,
      data.approved_by_staff_id,
      data.approved_at,
      data.transfer_status,
      data.status,
      data.created_by_student_id,
      data.created_by_staff_id
    ]
  );

  return result;

};

// Get All
const getAllSchoolTransfers = async () => {

  const [rows] = await pool.query(
    `
  SELECT
t.*,

stu.full_name AS student_name,
st.full_name AS staff_name,

fs.school_name AS from_school_name,
ts.school_name AS to_school_name,

creator.full_name AS created_by_name

FROM tbl_school_transfers t

LEFT JOIN student stu
ON t.student_id = stu.id

LEFT JOIN staff st
ON t.staff_id = st.id

LEFT JOIN school fs
ON t.from_school_id = fs.id

LEFT JOIN school ts
ON t.to_school_id = ts.id

LEFT JOIN staff creator
ON t.created_by_staff_id = creator.id

ORDER BY t.id DESC;
    `
  );

  return rows;

};

// School Wise
const getSchoolTransfersBySchool =
async (schoolId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      from_school_id = ?
      OR to_school_id = ?

    ORDER BY id DESC
    `,
    [
      schoolId,
      schoolId
    ]
  );

  return rows;

};

// Staff Wise
const getSchoolTransfersByStaff =
async (staffId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      staff_id = ?
      OR requested_by_staff_id = ?

    ORDER BY id DESC
    `,
    [
      staffId,
      staffId
    ]
  );

  return rows;

};

// Student Wise
const getSchoolTransfersByStudent =
async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      student_id = ?
      OR requested_by_student_id = ?

    ORDER BY id DESC
    `,
    [
      studentId,
      studentId
    ]
  );

  return rows;

};

// Get By Id
const getSchoolTransferById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];

};

// School Wise
const getSchoolTransferByIdAndSchool =
async (
  id,
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      id = ?
      AND (
        from_school_id = ?
        OR to_school_id = ?
      )
    `,
    [
      id,
      schoolId,
      schoolId
    ]
  );

  return rows[0];

};

// Staff Wise
const getSchoolTransferByIdAndStaff =
async (
  id,
  staffId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      id = ?
      AND (
        staff_id = ?
        OR requested_by_staff_id = ?
      )
    `,
    [
      id,
      staffId,
      staffId
    ]
  );

  return rows[0];

};

// Student Wise
const getSchoolTransferByIdAndStudent =
async (
  id,
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_school_transfers

    WHERE
      id = ?
      AND (
        student_id = ?
        OR requested_by_student_id = ?
      )
    `,
    [
      id,
      studentId,
      studentId
    ]
  );

  return rows[0];

};

// Approve
const approveSchoolTransfer = async (
  id,
  approvedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_transfers
    SET
      approved_by_staff_id = ?,
      approved_at = NOW(),
      transfer_status = 'APPROVED'
    WHERE id = ?
    `,
    [
      approvedBy,
      id
    ]
  );

  return result;

};

// Reject
const rejectSchoolTransfer = async (
  id,
  approvedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_transfers
    SET
      approved_by_staff_id = ?,
      approved_at = NOW(),
      transfer_status = 'REJECTED'
    WHERE id = ?
    `,
    [
      approvedBy,
      id
    ]
  );

  return result;

};

// Complete
const completeSchoolTransfer = async (
  id,
  updatedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_school_transfers
    SET
      updated_by_staff_id = ?,
      transfer_status = 'COMPLETED',
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      updatedBy,
      id
    ]
  );

  return result;

};

module.exports = {
  createSchoolTransfer,

  getAllSchoolTransfers,
  getSchoolTransfersBySchool,
  getSchoolTransfersByStaff,
  getSchoolTransfersByStudent,

  getSchoolTransferById,
  getSchoolTransferByIdAndSchool,
  getSchoolTransferByIdAndStaff,
  getSchoolTransferByIdAndStudent,

  approveSchoolTransfer,
  rejectSchoolTransfer,
  completeSchoolTransfer
};