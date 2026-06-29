const {
  createSchoolMediumService,
  getAllSchoolMediumsService,
  getSchoolMediumByIdService,
  updateSchoolMediumService,
  approveSchoolMediumService,
  rejectSchoolMediumService,
  getSchoolMediumsBySchoolIdService,
  deleteSchoolMediumService
} = require("../services/schoolMediumService");

const createSchoolMedium = async (
  req,
  res
) => {
  try {

    console.log("REQ BODY => ", req.body);
    

    const result =
      await createSchoolMediumService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

  console.log(
    "CREATE SCHOOL MEDIUM ERROR =>",
    error
  );

  return res.status(500).json({
    success: false,
    message: error.message
  });

}
};

const getSchoolMediumsBySchoolId =
async (req, res) => {

  try {

    const data =
      await getSchoolMediumsBySchoolIdService(
        req.params.schoolId
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

const getAllSchoolMediums =
async (req, res) => {

  try {

    const data =
      await getAllSchoolMediumsService();

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
const deleteSchoolMedium =
async (req, res) => {

  try {

    await deleteSchoolMediumService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "School Medium Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
const getSchoolMediumById =
async (req, res) => {

  try {

    const data =
      await getSchoolMediumByIdService(
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

const updateSchoolMedium =
async (req, res) => {

  try {

    await updateSchoolMediumService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "School Medium Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const approveSchoolMedium =
async (req, res) => {

  try {

    await approveSchoolMediumService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "School Medium Approved"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const rejectSchoolMedium =
async (req, res) => {

  try {

    await rejectSchoolMediumService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "School Medium Rejected"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSchoolMedium,
  getAllSchoolMediums,
  getSchoolMediumById,
  updateSchoolMedium,
  approveSchoolMedium,
  rejectSchoolMedium,
  getSchoolMediumsBySchoolId,
  deleteSchoolMedium
};