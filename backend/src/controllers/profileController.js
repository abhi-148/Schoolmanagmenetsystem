const {
  getProfileService,
  updateProfileService
} = require("../services/profileService");

const getProfile = async (
  req,
  res
) => {

  try {

    const profile =
      await getProfileService(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: profile
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateProfile = async (
  req,
  res
) => {

  try {

    const result =
      await updateProfileService(
        req.user.id,
        req.body.full_name,
        req.body.email
      );

    return res.status(200).json({
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

module.exports = {
  getProfile,
  updateProfile
};