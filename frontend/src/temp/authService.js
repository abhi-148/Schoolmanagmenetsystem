import api from "./api";

export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

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

export const resetPassword = async (
  data
) => {

  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};