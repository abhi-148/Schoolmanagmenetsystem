import api from "./api";

// ==============================
// Get All Follow Ups
// ==============================

export const getFollowUps = async () => {

  const response = await api.get(
    "/admission-follow-ups"
  );

  return response.data;

};

// ==============================
// Get Follow Up By Id
// ==============================

export const getFollowUpById = async (
  id
) => {

  const response = await api.get(
    `/admission-follow-ups/${id}`
  );

  return response.data;

};

// ==============================
// Create Follow Up
// ==============================

export const createFollowUp = async (
  data
) => {

  const response = await api.post(
    "/admission-follow-ups",
    data
  );

  return response.data;

};

// ==============================
// Update Follow Up
// ==============================

export const updateFollowUp = async (
  id,
  data
) => {

  const response = await api.put(
    `/admission-follow-ups/${id}`,
    data
  );

  return response.data;

};

// ==============================
// Delete Follow Up
// ==============================

export const deleteFollowUp = async (
  id
) => {

  const response = await api.delete(
    `/admission-follow-ups/${id}`
  );

  return response.data;

};

// ==============================
// Search Follow Ups
// ==============================

export const searchFollowUps = async (
  keyword
) => {

  const response = await api.get(
    `/admission-follow-ups/search?keyword=${keyword}`
  );

  return response.data;

};

// ==============================
// Get Follow Ups By Inquiry
// ==============================

export const getFollowUpsByInquiry = async (
  inquiryId
) => {

  const response = await api.get(
    `/admission-follow-ups/inquiry/${inquiryId}`
  );

  return response.data;

};

// ==============================
// Get Follow Ups By Staff
// ==============================

export const getFollowUpsByStaff = async (
  staffId
) => {

  const response = await api.get(
    `/admission-follow-ups/staff/${staffId}`
  );

  return response.data;

};

// ==============================
// Get Follow Ups By Response Status
// ==============================

export const getFollowUpsByStatus = async (
  status
) => {

  const response = await api.get(
    `/admission-follow-ups/status/${status}`
  );

  return response.data;

};