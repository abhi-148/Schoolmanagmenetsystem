const pool = require("../config/db");

const getStudentReportCard =
async (
  studentId,
  examId
) => {

  const [rows] = await pool.query(
    `
    SELECT

      s.full_name,
      s.roll_number,

      e.exam_name,

      sub.subject_name,

      sm.max_marks,
      sm.obtained_marks

    FROM student_marks sm

    JOIN student s
      ON s.id = sm.student_id

    JOIN exams e
      ON e.id = sm.exam_id

    JOIN subjects sub
      ON sub.id = sm.subject_id

    WHERE sm.student_id = ?
    AND sm.exam_id = ?
    `,
    [
      studentId,
      examId
    ]
  );

  return rows;
};

module.exports = {
  getStudentReportCard
};