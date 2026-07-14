const {
  createLostAndFound,
  getAllLostAndFound,
  getLostAndFoundById,
  updateLostAndFound,
  updateLostAndFoundStatus,
  getLostAndFoundWithPagination,
  searchLostAndFound
} = require("../repositories/lostAndFoundRepository");

// Create Lost And Found
const createLostAndFoundService = async (
  itemData
) => {

  itemData.record_status = "ACTIVE";

  if (!itemData.status) {
    itemData.status = "UNCLAIMED";
  }

  await createLostAndFound(
    itemData
  );

  return {
    message:
      "Lost And Found Item Created Successfully"
  };

};

// Get All
const getAllLostAndFoundService =
async () => {

  return await getAllLostAndFound();

};

// Get By Id
const getLostAndFoundByIdService =
async (id) => {

  return await getLostAndFoundById(
    id
  );

};

// Update
const updateLostAndFoundService =
async (
  id,
  data
) => {

  return await updateLostAndFound(
    id,
    data
  );

};

// Update Status
const updateLostAndFoundStatusService =
async (
  id,
  status
) => {

  return await updateLostAndFoundStatus(
    id,
    status
  );

};

// Pagination
const getLostAndFoundWithPaginationService =
async (
  limit,
  offset
) => {

  return await getLostAndFoundWithPagination(
    limit,
    offset
  );

};

// Search
const searchLostAndFoundService =
async (
  search
) => {

  return await searchLostAndFound(
    search
  );

};

module.exports = {
  createLostAndFoundService,
  getAllLostAndFoundService,
  getLostAndFoundByIdService,
  updateLostAndFoundService,
  updateLostAndFoundStatusService,
  getLostAndFoundWithPaginationService,
  searchLostAndFoundService
};