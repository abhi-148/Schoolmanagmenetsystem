const {
  getProfile,
  updateProfile
} = require("../repositories/profileRepository");

const getProfileService = async (
  userId
) => {

  return await getProfile(
    userId
  );

};

const updateProfileService = async (
  userId,
  full_name,
  email
) => {

  await updateProfile(
    userId,
    full_name,
    email
  );

  return {
    message:
      "Profile Updated Successfully"
  };

};

module.exports = {
  getProfileService,
  updateProfileService
};