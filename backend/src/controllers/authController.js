const {
  loginSuperAdminService,
  changePasswordService,
  getProfileService,
  updateProfileService,
  forgotPasswordService,
  resetPasswordService
} = require("../services/authService");
const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const token =
      await loginSuperAdminService(
        email,
        password
      );

   return res.status(200).json({
  success: true,
  token,
  role: "SUPER_ADMIN"
});

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const changePassword = async (
  req,
  res
) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const result =
      await changePasswordService(
        req.user.id,
        oldPassword,
        newPassword
      );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const getProfile =
async (req, res) => {

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

    return res.status(400).json({
      success: false,
      message:
        error.message
    });

  }

};

const updateProfile =
async (req, res) => {

  try {

    const {
      full_name,
      email
    } = req.body;

    const result =
      await updateProfileService(
        req.user.id,
        full_name,
        email
      );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message:
        error.message
    });

  }

};
const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } =
      req.body;

    const result =
      await forgotPasswordService(
        email
      );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const resetPassword = async (
  req,
  res
) => {

  try {

    const {
      token,
      password
    } = req.body;

    const result =
      await resetPasswordService(
        token,
        password
      );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  login,
  changePassword,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
};