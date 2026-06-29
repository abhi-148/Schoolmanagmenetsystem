const {
  createSchoolMedium,
  getAllSchoolMediums,
  getSchoolMediumById,
  updateSchoolMedium,
  approveSchoolMedium,
  rejectSchoolMedium,
  getPendingSchoolMediumById,
  createMasterMediumFromRequest,
  updateSchoolMediumMasterMedium,
  getSchoolMediumsBySchoolId,
  deleteSchoolMedium,
  checkSchoolMediumExists
} = require("../repositories/schoolMediumRepository");

const createSchoolMediumService =
async (data) => {
  const exists =
  await checkSchoolMediumExists(
    data.school_id,
    data.master_medium_id
  );

if (exists) {

  throw new Error(
    "Medium already assigned"
  );

}

  data.status = "active";

  if (data.master_medium_id) {
    data.approval_status = "approved";
  } else {
    data.approval_status = "pending";
  }

  return await createSchoolMedium(data);
};

const getAllSchoolMediumsService =
async () => {
  return await getAllSchoolMediums();
};

const getSchoolMediumByIdService =
async (id) => {
  return await getSchoolMediumById(id);
};
const deleteSchoolMediumService =
async (id) => {

  return await deleteSchoolMedium(id);

};
const updateSchoolMediumService =
async (id, data) => {
  return await updateSchoolMedium(id, data);
};

const approveSchoolMediumService =
async (id, approved_by) => {

  const schoolMedium =
    await getPendingSchoolMediumById(id);

  if (!schoolMedium) {
    throw new Error(
      "School Medium Not Found"
    );
  }

  // Custom Medium Request
  if (
    schoolMedium.custom_medium_name &&
    !schoolMedium.master_medium_id
  ) {

    const masterMedium =
await createMasterMediumFromRequest(
  schoolMedium.custom_medium_name,
  schoolMedium.school_id,
  approved_by
);

    await updateSchoolMediumMasterMedium(
      id,
      masterMedium.insertId
    );

  }

  return await approveSchoolMedium(
    id,
    approved_by
  );
};
const getSchoolMediumsBySchoolIdService =
async (schoolId) => {

  return await getSchoolMediumsBySchoolId(
    schoolId
  );

};

const rejectSchoolMediumService =
async (id, approved_by) => {

  return await rejectSchoolMedium(
    id,
    approved_by
  );

};

module.exports = {
  createSchoolMediumService,
  getAllSchoolMediumsService,
  getSchoolMediumByIdService,
  updateSchoolMediumService,
  approveSchoolMediumService,
  rejectSchoolMediumService,
  getSchoolMediumsBySchoolIdService,
  deleteSchoolMediumService
};