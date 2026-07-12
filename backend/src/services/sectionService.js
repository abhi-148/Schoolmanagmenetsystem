const {
  createSection,
  getAllSections,
  getSectionsBySchool,
  getSectionSchoolClass,
  getSectionById,
  getSectionByIdAndSchool,
  getSectionsByClass,
  getSectionsByClassAndSchool,
deleteSection,
deleteSectionBySchool
} = require("../repositories/sectionRepository");

// Create
const createSectionService =
async (sectionData) => {

  if (
    sectionData.created_by_role ===
    "SCHOOL_ADMIN"
  ) {

    const schoolClass =
      await getSectionSchoolClass(
        sectionData.school_class_id
      );

    if (
      !schoolClass ||
      schoolClass.school_id !==
      sectionData.schoolId
    ) {

      throw new Error(
        "You cannot create Section for another School"
      );

    }

  }

  sectionData.status =
    sectionData.status || "active";

  return await createSection(
    sectionData
  );

};

// Get All
const getAllSectionsService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllSections();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getSectionsBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Id
const getSectionByIdService =
async (
  id,
  user
) => {

  if (
    user.role ===
    "SUPER_ADMIN"
  ) {

    return await getSectionById(
      id
    );

  }

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    return await getSectionByIdAndSchool(
      id,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Class
const getSectionsByClassService =
async (
  schoolClassId,
  user
) => {

  if (
    user.role ===
    "SUPER_ADMIN"
  ) {

    return await getSectionsByClass(
      schoolClassId
    );

  }

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    return await getSectionsByClassAndSchool(
      schoolClassId,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Delete
const deleteSectionService =
async (
  id,
  user
) => {

  if (
    user.role ===
    "SUPER_ADMIN"
  ) {

    return await deleteSection(
      id
    );

  }

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    return await deleteSectionBySchool(
      id,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

module.exports = {
  createSectionService,
  getAllSectionsService,
  getSectionByIdService,
  getSectionsByClassService,
  deleteSectionService
};