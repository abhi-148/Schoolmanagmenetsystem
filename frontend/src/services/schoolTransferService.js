import api from "./api";

// Get All
export const getSchoolTransfers = async () => {

  const response = await api.get(
    "/school-transfers"
  );

  return response.data;

};

// Get By Id
export const getSchoolTransferById = async (
  id
) => {

  const response = await api.get(
    `/school-transfers/${id}`
  );

  return response.data;

};

// Create
export const createSchoolTransfer = async (
  data
) => {

  const response = await api.post(
    "/school-transfers",
    data
  );

  return response.data;

};

// Approve
export const approveSchoolTransfer = async (
  id
) => {

  const response = await api.put(
    `/school-transfers/${id}/approve`
  );

  return response.data;

};

// Reject
export const rejectSchoolTransfer = async (
  id
) => {

  const response = await api.put(
    `/school-transfers/${id}/reject`
  );

  return response.data;

};

// Complete
export const completeSchoolTransfer = async (
  id
) => {

  const response = await api.put(
    `/school-transfers/${id}/complete`
  );

  return response.data;

};