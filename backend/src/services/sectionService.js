const {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsByClass,
  deleteSection
} = require("../repositories/sectionRepository");

// Create
const createSectionService =
async (sectionData) => {

  sectionData.status =
    sectionData.status || "active";

  return await createSection(
    sectionData
  );

};

// Get All
const getAllSectionsService =
async () => {

  return await getAllSections();

};

// Get By Id
const getSectionByIdService =
async (id) => {

  return await getSectionById(id);

};

// Get By Class
const getSectionsByClassService =
async (schoolClassId) => {

  return await getSectionsByClass(
    schoolClassId
  );

};

// Delete
const deleteSectionService =
async (id) => {

  return await deleteSection(id);

};

module.exports = {
  createSectionService,
  getAllSectionsService,
  getSectionByIdService,
  getSectionsByClassService,
  deleteSectionService
};