const {
  getStudentReportCard
} = require(
  "../repositories/reportCardRepository"
);

const getStudentReportCardService =
async (
  studentId,
  examId
) => {

  const data =
    await getStudentReportCard(
      studentId,
      examId
    );

  let totalMarks = 0;
  let obtainedMarks = 0;

  data.forEach((item) => {

    totalMarks +=
      Number(item.max_marks);

    obtainedMarks +=
      Number(
        item.obtained_marks
      );

  });

  const percentage =
    totalMarks > 0
      ? (
          obtainedMarks /
          totalMarks
        ) * 100
      : 0;

  let grade = "F";

  if (percentage >= 90)
    grade = "A+";
  else if (
    percentage >= 80
  )
    grade = "A";
  else if (
    percentage >= 70
  )
    grade = "B";
  else if (
    percentage >= 60
  )
    grade = "C";
  else if (
    percentage >= 50
  )
    grade = "D";

  return {
    student:
      data[0]?.full_name,

    roll_number:
      data[0]?.roll_number,

    exam_name:
      data[0]?.exam_name,

    subjects: data,

    totalMarks,
    obtainedMarks,

    percentage:
      percentage.toFixed(2),

    grade
  };

};

module.exports = {
  getStudentReportCardService
};