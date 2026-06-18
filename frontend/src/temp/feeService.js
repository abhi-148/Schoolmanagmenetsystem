import api from "./api";

export const getFees = async () => {

  const response =
    await api.get(
      "/fees"
    );

  return response.data;

};

export const createFee = async (
  feeData
) => {

  const response =
    await api.post(
      "/fees",
      feeData
    );

  return response.data;

};