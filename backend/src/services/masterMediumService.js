const {
createMasterMedium,
getAllMasterMediums,
getMasterMediumById,
updateMasterMedium,
deleteMasterMedium,
checkMediumUsed,
checkMediumExists
} = require("../repositories/masterMediumRepository");

const createMasterMediumService =
async (data) => {

  const exists =
    await checkMediumExists(
      data.medium_name
    );

  if (exists) {

    throw new Error(
      "Medium already exists"
    );

  }

  data.status = "active";
  data.approval_status = "approved";

  return await createMasterMedium(data);

};

const getAllMasterMediumsService =
async () => {
return await getAllMasterMediums();
};

const getMasterMediumByIdService =
async (id) => {
return await getMasterMediumById(id);
};

const updateMasterMediumService =
async (id, data) => {
return await updateMasterMedium(id, data);
};


const deleteMasterMediumService =
  async (id) => {

    const used =
      await checkMediumUsed(id);

    if (used) {

      throw new Error(
        "Medium is assigned to School"
      );

    }

    return await deleteMasterMedium(id);

};



module.exports = {
createMasterMediumService,
getAllMasterMediumsService,
getMasterMediumByIdService,
updateMasterMediumService,
deleteMasterMediumService
};
