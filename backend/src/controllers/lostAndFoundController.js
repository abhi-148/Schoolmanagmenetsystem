const {
  createLostAndFoundService,
  getAllLostAndFoundService,
  getLostAndFoundByIdService,
  updateLostAndFoundService,
  updateLostAndFoundStatusService,
  getLostAndFoundWithPaginationService,
  searchLostAndFoundService
} = require("../services/lostAndFoundService");

// Create Lost And Found
const createLostAndFound = async (
  req,
  res
) => {

  try {

    const result =
      await createLostAndFoundService(
        req.body
      );

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

// Get All Lost And Found
const getAllLostAndFound = async (
  req,
  res
) => {

  try {

    const items =
      await getAllLostAndFoundService();

    return res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get Lost And Found By Id
const getLostAndFoundById = async (
  req,
  res
) => {

  try {

    const item =
      await getLostAndFoundByIdService(
        req.params.id
      );

    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Lost And Found Item Not Found"
      });

    }

    return res.status(200).json({
      success: true,
      data: item
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Lost And Found
const updateLostAndFound = async (
  req,
  res
) => {

  try {

    await updateLostAndFoundService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message:
        "Lost And Found Item Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Record Status
const updateLostAndFoundStatus = async (
  req,
  res
) => {

  try {

    await updateLostAndFoundStatusService(
      req.params.id,
      req.body.record_status
    );

    return res.status(200).json({
      success: true,
      message:
        "Lost And Found Status Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Pagination
const getLostAndFoundWithPagination =
async (
  req,
  res
) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const items =
      await getLostAndFoundWithPaginationService(
        limit,
        offset
      );

    return res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Search
const searchLostAndFound = async (
  req,
  res
) => {

  try {

    const items =
      await searchLostAndFoundService(
        req.query.search
      );

    return res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createLostAndFound,
  getAllLostAndFound,
  getLostAndFoundById,
  updateLostAndFound,
  updateLostAndFoundStatus,
  getLostAndFoundWithPagination,
  searchLostAndFound
};