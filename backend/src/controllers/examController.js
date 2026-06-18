const {
  createExamService,
  getAllExamsService,
  getExamByIdService,
  updateExamService,
  deleteExamService
} = require(
  "../services/examService"
);

// Create Exam
const createExam = async (req, res) => {

  try {

    const result =
      await createExamService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get All Exams
const getAllExams = async (req, res) => {

  try {

    const data =
      await getAllExamsService();

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

// Get Exam By Id
const getExamById = async (req, res) => {

  try {

    const data =
      await getExamByIdService(
        req.params.id
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

// Update Exam
const updateExam = async (req, res) => {

  try {

    await updateExamService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Exam Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Exam
const deleteExam = async (req, res) => {

  try {

    await deleteExamService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Exam Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
};