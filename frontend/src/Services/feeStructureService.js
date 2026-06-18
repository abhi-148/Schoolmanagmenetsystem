import api from "./api";

export const getFeeStructures = async () => {
  const response = await api.get("/fee-structures");
  return response.data;
};

export const createFeeStructure = async (data) => {
  const response = await api.post(
    "/fee-structures",
    data
  );

  return response.data;
};

export const updateFeeStructure = async (
  id,
  data
) => {
  const response = await api.put(
    `/fee-structures/${id}`,
    data
  );

  return response.data;
};

export const deleteFeeStructure = async (
  id
) => {
  const response = await api.delete(
    `/fee-structures/${id}`
  );

  return response.data;
};