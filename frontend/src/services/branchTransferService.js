import api from "./api";

// Get All
export const getBranchTransfers = async () => {

  const response =
    await api.get("/branch-transfers");

  return response.data;

};

// Approve
export const approveBranchTransfer = async (id) => {

  const response =
    await api.put(
      `/branch-transfers/${id}/approve`
    );

  return response.data;

};

// Reject
export const rejectBranchTransfer = async (id) => {

  const response =
    await api.put(
      `/branch-transfers/${id}/reject`
    );

  return response.data;

};

// Complete
export const completeBranchTransfer = async (id) => {

  const response =
    await api.put(
      `/branch-transfers/${id}/complete`
    );

  return response.data;

};