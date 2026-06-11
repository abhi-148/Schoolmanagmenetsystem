const pool = require("../config/db");

const createFee = async (feeData) => {

  const [result] = await pool.query(
    `INSERT INTO fees
    (
      school_id,
      student_id,
      amount,
      payment_date,
      status
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      feeData.school_id,
      feeData.student_id,
      feeData.amount,
      feeData.payment_date,
      feeData.status
    ]
  );

  return result;
};

const getAllFees = async () => {

  const [rows] = await pool.query(
    `SELECT * FROM fees`
  );

  return rows;
};

const getFeesByStudentId = async (
  studentId
) => {

  const [rows] = await pool.query(
    `SELECT * FROM fees
     WHERE student_id = ?`,
    [studentId]
  );

  return rows;
};

module.exports = {
  createFee,
  getAllFees,
  getFeesByStudentId
};