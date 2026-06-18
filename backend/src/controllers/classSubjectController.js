const {
  createClassSubjectService,
  getAllClassSubjectsService,
  getSubjectsByClassService,
  deleteClassSubjectService
} = require(
  "../services/classSubjectService"
);

// Create Mapping
const createClassSubject =
async (req, res) => {

  try {

    const result =
      await createClassSubjectService({
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

// Get All Mappings
const getAllClassSubjects =
async (req, res) => {

  try {

    const data =
      await getAllClassSubjectsService();

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

// Get Subjects By Class
const getSubjectsByClass =
async (req, res) => {

  try {

    const data =
      await getSubjectsByClassService(
        req.params.schoolClassId
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

// Delete Mapping
const deleteClassSubject =
async (req, res) => {

  try {

    await deleteClassSubjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Class Subject Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createClassSubject,
  getAllClassSubjects,
  getSubjectsByClass,
  deleteClassSubject
};