const {
  createStudentMarkService,
  getAllStudentMarksService,
  getMarksByStudentService,
  getMarksByExamService,
  updateStudentMarkService,
  deleteStudentMarkService
} = require("../services/studentMarkService");

// Add Marks
const createStudentMark = async (req, res) => {
  try {

    const result = await createStudentMarkService({
      ...req.body,
      created_by: req.user.id
    });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error("Student Mark Error =>", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Marks
const getAllStudentMarks = async (req, res) => {
  try {

    const data =
      await getAllStudentMarksService();

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

// Get By Student
const getMarksByStudent = async (req, res) => {
  try {

    const data =
      await getMarksByStudentService(
        req.params.studentId
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

// Get By Exam
const getMarksByExam = async (req, res) => {
  try {

    const data =
      await getMarksByExamService(
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

// Update Marks
const updateStudentMark = async (req, res) => {
  try {

    await updateStudentMarkService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Marks Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Delete Marks
const deleteStudentMark = async (req, res) => {
  try {

    await deleteStudentMarkService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Marks Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createStudentMark,
  getAllStudentMarks,
  getMarksByStudent,
  getMarksByExam,
  updateStudentMark,
  deleteStudentMark
};