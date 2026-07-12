const {
  createSectionService,
  getAllSectionsService,
  getSectionByIdService,
  getSectionsByClassService,
  deleteSectionService
} = require("../services/sectionService");

// Create
const createSection =
async (req, res) => {

  try {

  const result =
  await createSectionService({
    ...req.body,
    created_by: req.user.id,
    created_by_role: req.user.role,
    schoolId: req.user.schoolId
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
const getAllSections =
async (req, res) => {

  try {

    const data =
await getAllSectionsService(
  req.user
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

// Get By Id
const getSectionById =
async (req, res) => {

  try {

   const data =
await getSectionByIdService(
  req.params.id,
  req.user
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

// Get By Class
const getSectionsByClass =
async (req, res) => {

  try {

    const data =
await getSectionsByClassService(
  req.params.schoolClassId,
  req.user
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
const deleteSection =
async (req, res) => {

  try {

    await deleteSectionService(
  req.params.id,
  req.user
);

    return res.status(200).json({
      success: true,
      message:
        "Section Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsByClass,
  deleteSection
};