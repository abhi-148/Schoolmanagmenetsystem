const pool = require("../config/db");

// Create Payment
const createStudentFeePayment = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO student_fee_payments
    (
      student_id,
      fee_structure_id,
      amount_paid,
      payment_date,
      payment_mode,
      receipt_no,
      remarks,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.student_id,
      data.fee_structure_id,
      data.amount_paid,
      data.payment_date,
      data.payment_mode,
      data.receipt_no,
      data.remarks,
      data.created_by
    ]
  );

  return result;
};

// Get All Payments
const getAllStudentFeePayments = async () => {

  const [rows] = await pool.query(
    `
    SELECT
      sfp.id,
      sfp.student_id,
      sfp.fee_structure_id,

      s.full_name,
      s.roll_number,

      fs.fee_type,

      sfp.amount_paid,
      sfp.payment_date,
      sfp.payment_mode,
      sfp.receipt_no,
      sfp.remarks

    FROM student_fee_payments sfp

    JOIN student s
      ON s.id = sfp.student_id

    JOIN fee_structures fs
      ON fs.id = sfp.fee_structure_id

    ORDER BY sfp.id DESC
    `
  );

  console.log("PAYMENTS =>", rows);

  return rows;
};

// Get By Student
const getPaymentsByStudent = async (studentId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM student_fee_payments
    WHERE student_id = ?
    ORDER BY id DESC
    `,
    [studentId]
  );

  return rows;
};

// Update Payment
const updateStudentFeePayment = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE student_fee_payments
    SET
      amount_paid = ?,
      payment_mode = ?,
      remarks = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.amount_paid,
      data.payment_mode,
      data.remarks,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete Payment
const deleteStudentFeePayment = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM student_fee_payments
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createStudentFeePayment,
  getAllStudentFeePayments,
  getPaymentsByStudent,
  updateStudentFeePayment,
  deleteStudentFeePayment
};