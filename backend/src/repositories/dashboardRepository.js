const pool = require("../config/db");

const getDashboardStats = async () => {


  const [schools] = await pool.query(
    "SELECT COUNT(*) AS totalSchools FROM school"
  );

  const [staff] = await pool.query(
    "SELECT COUNT(*) AS totalStaff FROM staff"
  );

  const [students] = await pool.query(
    "SELECT COUNT(*) AS totalStudents FROM student"
  );

  const [staffTypes] = await pool.query(
    `SELECT COUNT(*) AS totalStaffTypes
     FROM staff_type`
  );

  const [departments] = await pool.query(
    `SELECT COUNT(*) AS totalDepartments
     FROM staff_department`
  );

  const [present] = await pool.query(
    `SELECT COUNT(*) AS presentToday
     FROM attendance
     WHERE status = 'PRESENT'
     AND attendance_date = CURDATE()`
  );

  const [absent] = await pool.query(
    `SELECT COUNT(*) AS absentToday
     FROM attendance
     WHERE status = 'ABSENT'
     AND attendance_date = CURDATE()`
  );

  const [feeCollection] = await pool.query(
    `SELECT COALESCE(
        SUM(amount_paid), 0
      ) AS totalCollection
     FROM student_fee_payments`
  );

  const [feeStructures] = await pool.query(
    `SELECT COUNT(*) AS totalFeeStructures
     FROM fee_structures`
  );

  return {
    totalSchools:
      schools[0].totalSchools,

    totalStaff:
      staff[0].totalStaff,

    totalStudents:
      students[0].totalStudents,

    totalStaffTypes:
      staffTypes[0].totalStaffTypes,

    totalDepartments:
      departments[0].totalDepartments,

    presentToday:
      present[0].presentToday,

    absentToday:
      absent[0].absentToday,

    totalCollection:
      feeCollection[0].totalCollection,

    totalFeeStructures:
      feeStructures[0].totalFeeStructures
  };
};
const getSchoolDashboardStats = async (
  schoolId
) => {

  const [staff] = await pool.query(
    `SELECT COUNT(*) AS totalStaff
     FROM staff
     WHERE school_id = ?`,
    [schoolId]
  );

  const [students] = await pool.query(
    `SELECT COUNT(*) AS totalStudents
     FROM student
     WHERE school_id = ?`,
    [schoolId]
  );

  const [present] = await pool.query(
    `SELECT COUNT(*) AS presentToday
     FROM attendance a
     INNER JOIN student s
       ON a.student_id = s.id
     WHERE
       s.school_id = ?
       AND a.status = 'PRESENT'
       AND a.attendance_date = CURDATE()`,
    [schoolId]
  );

  const [absent] = await pool.query(
    `SELECT COUNT(*) AS absentToday
     FROM attendance a
     INNER JOIN student s
       ON a.student_id = s.id
     WHERE
       s.school_id = ?
       AND a.status = 'ABSENT'
       AND a.attendance_date = CURDATE()`,
    [schoolId]
  );

  return {

    totalStaff:
      staff[0].totalStaff,

    totalStudents:
      students[0].totalStudents,

    presentToday:
      present[0].presentToday,

    absentToday:
      absent[0].absentToday

  };

};

module.exports = {
  getDashboardStats,
  getSchoolDashboardStats
};