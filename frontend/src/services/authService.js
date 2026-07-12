import api from "./api";

// ===========================
// Login (Role Based)
// ===========================
export const loginUser = async (data) => {

  let response;

  // Super Admin Login
  try {

    response = await api.post(
      "/auth/login",
      data
    );

    return response.data;

  } catch (error) {}

  // Staff Login
  try {

    response = await api.post(
      "/staff/login",
      data
    );

    return {
      ...response.data,
      role: "STAFF"
    };

  } catch (error) {}

  // Student Login
  try {

    response = await api.post(
      "/students/login",
      {
        roll_number: data.email,
        password: data.password
      }
    );

    return response.data;

  } catch (error) {}

  throw new Error(
    "Invalid Email / Roll Number or Password"
  );

};

// ===========================
// Forgot Password
// ===========================
export const forgotPassword = async (
  email
) => {

  const response = await api.post(
    "/auth/forgot-password",
    {
      email
    }
  );

  return response.data;

};

// ===========================
// Reset Password
// ===========================
export const resetPassword = async (
  data
) => {

  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return response.data;

};