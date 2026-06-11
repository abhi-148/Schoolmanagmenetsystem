const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const transporter =
  require("../config/mailConfig");

const {
  saveResetToken,
  findResetToken,
  deleteResetToken,
  findSuperAdminByEmail,
  createSuperAdmin,
  loginSuperAdmin,
  findSuperAdminById,
  updateSuperAdminPassword,
  updateSuperAdminProfile
} = require("../repositories/authRepository");

// Create Default Super Admin
const createDefaultSuperAdmin = async () => {

  const email =
    process.env.SUPER_ADMIN_EMAIL;

  const existingAdmin =
    await findSuperAdminByEmail(email);

  if (existingAdmin) {
    console.log(
      "Super Admin Already Exists"
    );
    return;
  }

  const hashedPassword =
    await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10
    );

  await createSuperAdmin({
    full_name: "Super Admin",
    email:
      process.env.SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    status: "ACTIVE"
  });

  console.log(
    "Default Super Admin Created"
  );
};

// Login
const loginSuperAdminService = async (
  email,
  password
) => {

  const admin =
    await loginSuperAdmin(email);

  if (!admin) {
    throw new Error(
      "Invalid Email"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid Password"
    );
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: "SUPER_ADMIN"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return token;
};

// Change Password
const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {

  const admin =
    await findSuperAdminById(userId);

  if (!admin) {
    throw new Error(
      "Admin Not Found"
    );
  }

  const isMatch =
    await bcrypt.compare(
      oldPassword,
      admin.password
    );

  if (!isMatch) {
    throw new Error(
      "Old Password Incorrect"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await updateSuperAdminPassword(
    userId,
    hashedPassword
  );

  return {
    message:
      "Password Changed Successfully"
  };
};

// Get Profile
const getProfileService = async (
  userId
) => {

  const admin =
    await findSuperAdminById(userId);

  if (!admin) {
    throw new Error(
      "Admin Not Found"
    );
  }

  return {
    id: admin.id,
    full_name:
      admin.full_name,
    email:
      admin.email,
    status:
      admin.status
  };
};

// Update Profile
const updateProfileService = async (
  userId,
  full_name,
  email
) => {

  await updateSuperAdminProfile(
    userId,
    full_name,
    email
  );

  return {
    message:
      "Profile Updated Successfully"
  };
};

// Forgot Password
const forgotPasswordService =
  async (email) => {

    const admin =
      await findSuperAdminByEmail(
        email
      );

    if (!admin) {
      throw new Error(
        "Email Not Found"
      );
    }

    const token =
      crypto.randomBytes(32)
        .toString("hex");

    const expiresAt =
      new Date(
        Date.now() +
        15 * 60 * 1000
      );

    await saveResetToken(
      email,
      token,
      expiresAt
    );

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Reset Password",

      html: `
        <h2>Password Reset</h2>
        <p>Use this token to reset your password:</p>
        <h3>${token}</h3>
        <p>This token expires in 15 minutes.</p>
      `
    });

    return {
      message:
        "Reset Token Sent Successfully"
    };
  };

// Reset Password
const resetPasswordService =
  async (
    token,
    password
  ) => {

    const resetToken =
      await findResetToken(
        token
      );

    if (!resetToken) {
      throw new Error(
        "Invalid Reset Token"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const admin =
      await findSuperAdminByEmail(
        resetToken.email
      );

    if (!admin) {
      throw new Error(
        "Admin Not Found"
      );
    }

    await updateSuperAdminPassword(
      admin.id,
      hashedPassword
    );

    await deleteResetToken(
      token
    );

    return {
      message:
        "Password Reset Successfully"
    };
  };

module.exports = {
  createDefaultSuperAdmin,
  loginSuperAdminService,
  changePasswordService,
  getProfileService,
  updateProfileService,
  forgotPasswordService,
  resetPasswordService
};