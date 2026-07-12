const pool = require("../config/db");

// Create Branch Transfer
const createBranchTransfer = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_branch_transfers
    (
      student_id,
      staff_id,
      staff_type_id,
      from_branch_id,
      from_batch_id,
      to_branch_id,
      to_batch_id,
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
      data.staff_type_id,
      data.from_branch_id,
      data.from_batch_id,
      data.to_branch_id,
      data.to_batch_id,
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
const getAllBranchTransfers = async () => {

  const [rows] = await pool.query(
    `
  SELECT
bt.*,

stu.full_name AS student_name,
st.full_name AS staff_name,

fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,

creator.full_name AS created_by_name

FROM tbl_branch_transfers bt

LEFT JOIN student stu
ON bt.student_id = stu.id

LEFT JOIN staff st
ON bt.staff_id = st.id

LEFT JOIN school_branches fb
ON bt.from_branch_id = fb.id

LEFT JOIN school_branches tb
ON bt.to_branch_id = tb.id

LEFT JOIN staff creator
ON bt.created_by_staff_id = creator.id

ORDER BY bt.id DESC
    `
  );

  return rows;

};

// School Wise
const getBranchTransfersBySchool =
async (schoolId) => {

  const [rows] = await pool.query(
    `
    SELECT

bt.*,

stu.full_name AS student_name,
st.full_name AS staff_name,

fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,

creator.full_name AS created_by_name

    FROM tbl_branch_transfers bt

    LEFT JOIN student stu
ON bt.student_id = stu.id

LEFT JOIN staff st
ON bt.staff_id = st.id

LEFT JOIN school_branches fb
ON bt.from_branch_id = fb.id

LEFT JOIN school_branches tb
ON bt.to_branch_id = tb.id

LEFT JOIN staff creator
ON bt.created_by_staff_id = creator.id

    LEFT JOIN school_branches sb1
      ON sb1.id = bt.from_branch_id

    LEFT JOIN school_branches sb2
      ON sb2.id = bt.to_branch_id

    WHERE
      sb1.school_id = ?
      OR sb2.school_id = ?

    ORDER BY bt.id DESC
    `,
    [
      schoolId,
      schoolId
    ]
  );

  return rows;

};

// Staff Wise
const getBranchTransfersByStaff =
async (staffId) => {

  const [rows] = await pool.query(
    `
    SELECT
bt.*,
stu.full_name AS student_name,
st.full_name AS staff_name,
fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,
creator.full_name AS created_by_name
    FROM tbl_branch_transfers

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
const getBranchTransfersByStudent =
async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT
bt.*,
stu.full_name AS student_name,
st.full_name AS staff_name,
fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,
creator.full_name AS created_by_name
    FROM tbl_branch_transfers bt

LEFT JOIN student stu
ON bt.student_id = stu.id

LEFT JOIN staff st
ON bt.staff_id = st.id

LEFT JOIN school_branches fb
ON bt.from_branch_id = fb.id

LEFT JOIN school_branches tb
ON bt.to_branch_id = tb.id

LEFT JOIN staff creator
ON bt.created_by_staff_id = creator.id

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
const getBranchTransferById = async (id) => {

  const [rows] = await pool.query(
    `
   SELECT

bt.*,

stu.full_name AS student_name,
st.full_name AS staff_name,

fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,

creator.full_name AS created_by_name
    FROM tbl_branch_transfers
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];

};

// School Wise
const getBranchTransferByIdAndSchool =
async (
  id,
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT bt.*

    FROM tbl_branch_transfers bt

   LEFT JOIN school_branches sb1
ON sb1.id = fb.id

    LEFT JOIN school_branches sb2
ON sb2.id = tb.id

    WHERE
      bt.id = ?
      AND (
        sb1.school_id = ?
        OR sb2.school_id = ?
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
const getBranchTransferByIdAndStaff =
async (
  id,
  staffId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
   FROM tbl_branch_transfers bt

LEFT JOIN student stu
ON bt.student_id = stu.id

LEFT JOIN staff st
ON bt.staff_id = st.id

LEFT JOIN school_branches fb
ON bt.from_branch_id = fb.id

LEFT JOIN school_branches tb
ON bt.to_branch_id = tb.id

LEFT JOIN staff creator
ON bt.created_by_staff_id = creator.id

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
const getBranchTransferByIdAndStudent =
async (
  id,
  studentId
) => {

  const [rows] = await pool.query(
    `
    SELECT
bt.*,
stu.full_name AS student_name,
st.full_name AS staff_name,
fb.branch_name AS from_branch_name,
tb.branch_name AS to_branch_name,
creator.full_name AS created_by_name
    FROM tbl_branch_transfers bt

LEFT JOIN student stu
ON bt.student_id = stu.id

LEFT JOIN staff st
ON bt.staff_id = st.id

LEFT JOIN school_branches fb
ON bt.from_branch_id = fb.id

LEFT JOIN school_branches tb
ON bt.to_branch_id = tb.id

LEFT JOIN staff creator
ON bt.created_by_staff_id = creator.id

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
const approveBranchTransfer = async (
  id,
  approvedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_branch_transfers
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
const rejectBranchTransfer = async (
  id,
  approvedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_branch_transfers
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
const completeBranchTransfer = async (
  id,
  updatedBy
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_branch_transfers
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
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransfersBySchool,
  getBranchTransfersByStaff,
  getBranchTransfersByStudent,
  getBranchTransferById,
  approveBranchTransfer,
  rejectBranchTransfer,
  completeBranchTransfer,
  getBranchTransferByIdAndSchool,
getBranchTransferByIdAndStaff,
getBranchTransferByIdAndStudent
};