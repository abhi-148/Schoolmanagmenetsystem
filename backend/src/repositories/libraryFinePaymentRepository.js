const pool = require("../config/db");

// Create Library Fine Payment
const createLibraryFinePayment = async (
  paymentData
) => {

  const [result] = await pool.query(
    `
    INSERT INTO tbl_library_fine_payments
    (
      school_id,
      fine_id,
      student_id,
      amount_paid,
      payment_date,
      payment_mode,
      transaction_id,
      receipt_path,
      payment_status,
      status,
      remarks,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      paymentData.school_id,
      paymentData.fine_id,
      paymentData.student_id,
      paymentData.amount_paid,
      paymentData.payment_date,
      paymentData.payment_mode,
      paymentData.transaction_id,
      paymentData.receipt_path,
      paymentData.payment_status,
      paymentData.status,
      paymentData.remarks,
      paymentData.created_by,
      paymentData.updated_by
    ]
  );

  return result;

};

// Check Duplicate Transaction Id
const findTransactionById = async (
  transactionId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM tbl_library_fine_payments
    WHERE transaction_id = ?
    `,
    [transactionId]
  );

  return rows[0];

};

// Get All Library Fine Payments
const getAllLibraryFinePayments = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      lfp.*,
      sc.school_name,
      st.full_name AS student_name,
      cb.full_name AS created_by_name,
      ub.full_name AS updated_by_name

    FROM tbl_library_fine_payments lfp

    LEFT JOIN school sc
      ON lfp.school_id = sc.id

    LEFT JOIN student st
      ON lfp.student_id = st.id

    LEFT JOIN staff cb
      ON lfp.created_by = cb.id

    LEFT JOIN staff ub
      ON lfp.updated_by = ub.id

    ORDER BY lfp.fine_payment_id DESC
    `
  );

  return rows;

};

// Get Library Fine Payment By Id
const getLibraryFinePaymentById = async (
  id
) => {

  const [rows] = await pool.query(
    `
    SELECT
      lfp.*,
      sc.school_name,
      st.full_name AS student_name,
      cb.full_name AS created_by_name,
      ub.full_name AS updated_by_name

    FROM tbl_library_fine_payments lfp

  LEFT JOIN student st
ON lfp.student_id = st.id

LEFT JOIN staff cb
ON lfp.created_by = cb.id

LEFT JOIN staff ub
ON lfp.updated_by = ub.id

    LEFT JOIN school sc
      ON lfp.school_id = sc.id

    WHERE lfp.fine_payment_id = ?
    `,
    [id]
  );

  return rows[0];

};

// Update Library Fine Payment
const updateLibraryFinePayment = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_library_fine_payments
    SET
      school_id = ?,
      fine_id = ?,
      student_id = ?,
      amount_paid = ?,
      payment_date = ?,
      payment_mode = ?,
      transaction_id = ?,
      receipt_path = ?,
      payment_status = ?,
      remarks = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE fine_payment_id = ?
    `,
    [
      data.school_id,
      data.fine_id,
      data.student_id,
      data.amount_paid,
      data.payment_date,
      data.payment_mode,
      data.transaction_id,
      data.receipt_path,
      data.payment_status,
      data.remarks,
      data.updated_by,
      id
    ]
  );

  return result;

};

// Update Status
const updateLibraryFinePaymentStatus = async (
  id,
  status
) => {

  const [result] = await pool.query(
    `
    UPDATE tbl_library_fine_payments
    SET
      status = ?,
      updated_at = NOW()
    WHERE fine_payment_id = ?
    `,
    [
      status,
      id
    ]
  );

  return result;

};

// Pagination
const getLibraryFinePaymentsWithPagination =
async (
  limit,
  offset
) => {

  const [rows] = await pool.query(
    `
    SELECT
      lfp.*,
      sc.school_name,
      st.full_name AS student_name,
      cb.full_name AS created_by_name,
      ub.full_name AS updated_by_name

    FROM tbl_library_fine_payments lfp

    LEFT JOIN school sc
      ON lfp.school_id = sc.id

    LEFT JOIN student st
      ON lfp.student_id = st.id

    LEFT JOIN staff cb
      ON lfp.created_by = cb.id

    LEFT JOIN staff ub
      ON lfp.updated_by = ub.id

    ORDER BY lfp.fine_payment_id DESC

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
const searchLibraryFinePayments = async (
  search
) => {

  const [rows] = await pool.query(
    `
    SELECT
      lfp.*,
      sc.school_name,
      st.full_name AS student_name,
      cb.full_name AS created_by_name,
      ub.full_name AS updated_by_name

    FROM tbl_library_fine_payments lfp

    LEFT JOIN school sc
      ON lfp.school_id = sc.id

    LEFT JOIN student st
      ON lfp.student_id = st.id

    LEFT JOIN staff cb
      ON lfp.created_by = cb.id

    LEFT JOIN staff ub
      ON lfp.updated_by = ub.id

    WHERE

      lfp.transaction_id LIKE ?

      OR lfp.payment_mode LIKE ?

      OR lfp.payment_status LIKE ?

      OR st.full_name LIKE ?

      OR sc.school_name LIKE ?

    ORDER BY lfp.fine_payment_id DESC
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

  createLibraryFinePayment,

  getAllLibraryFinePayments,

  getLibraryFinePaymentById,

  updateLibraryFinePayment,

  updateLibraryFinePaymentStatus,

  getLibraryFinePaymentsWithPagination,

  searchLibraryFinePayments,

  findTransactionById

};