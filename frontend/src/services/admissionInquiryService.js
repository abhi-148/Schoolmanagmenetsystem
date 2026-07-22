import api from "./api";

// ==============================
// Get All Admission Inquiries
// ==============================

export const getAdmissionInquiries = async () => {

  const response = await api.get(
    "/admission-inquiries"
  );

  return response.data;

};

// ==============================
// Get Admission Inquiry By Id
// ==============================

export const getAdmissionInquiryById = async (
  id
) => {

  const response = await api.get(
    `/admission-inquiries/${id}`
  );

  return response.data;

};

// ==============================
// Create Admission Inquiry
// ==============================

export const createAdmissionInquiry = async (
  data
) => {

  const response = await api.post(
    "/admission-inquiries",
    data
  );

  return response.data;

};

// ==============================
// Update Admission Inquiry
// ==============================

export const updateAdmissionInquiry = async (
  id,
  data
) => {

  const response = await api.put(
    `/admission-inquiries/${id}`,
    data
  );

  return response.data;

};

// ==============================
// Delete Admission Inquiry
// ==============================

export const deleteAdmissionInquiry = async (
  id
) => {

  const response = await api.delete(
    `/admission-inquiries/${id}`
  );

  return response.data;

};

// ==============================
// Search Admission Inquiry
// ==============================

export const searchAdmissionInquiry = async (
  keyword
) => {

  const response = await api.get(
    `/admission-inquiries/search?keyword=${keyword}`
  );

  return response.data;

};

// ==============================
// Get Admission Inquiry By Status
// ==============================

export const getAdmissionInquiryByStatus = async (
  status
) => {

  const response = await api.get(
    `/admission-inquiries/status/${status}`
  );

  return response.data;

};

// ==============================
// Get Admission Inquiry By Assigned Staff
// ==============================

export const getAdmissionInquiryByAssignedStaff = async (
  staffId
) => {

  const response = await api.get(
    `/admission-inquiries/staff/${staffId}`
  );

  return response.data;

};