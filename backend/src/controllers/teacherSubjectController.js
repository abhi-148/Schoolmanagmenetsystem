const {
  createTeacherSubjectService,
  getAllTeacherSubjectsService,
  getSubjectsByTeacherService,
  deleteTeacherSubjectService
} = require(
  "../services/teacherSubjectService"
);

// Assign Subject
const createTeacherSubject =
async (req, res) => {

  try {

    const result =
      await createTeacherSubjectService({
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

// Get All
const getAllTeacherSubjects =
async (req, res) => {

  try {

    const data =
      await getAllTeacherSubjectsService();

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

// Get By Teacher
const getSubjectsByTeacher =
async (req, res) => {

  try {

    const data =
      await getSubjectsByTeacherService(
        req.params.staffId
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

// Delete
const deleteTeacherSubject =
async (req, res) => {

  try {

    await deleteTeacherSubjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Teacher Subject Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createTeacherSubject,
  getAllTeacherSubjects,
  getSubjectsByTeacher,
  deleteTeacherSubject
};