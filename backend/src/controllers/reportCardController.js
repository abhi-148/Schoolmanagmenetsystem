const {
  getStudentReportCardService
} = require(
  "../services/reportCardService"
);

const getStudentReportCard =
async (req, res) => {

  try {

    const data =
      await getStudentReportCardService(
        req.params.studentId,
        req.params.examId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getStudentReportCard
};