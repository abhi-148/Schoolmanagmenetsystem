const {
  createAdmissionInquiry,
  getAllAdmissionInquiries,
  getAdmissionInquiriesBySchool,
  getAdmissionInquiryById,
  updateAdmissionInquiry,
  deleteAdmissionInquiry,
  checkDuplicateInquiry,
  searchAdmissionInquiry,
  getAdmissionInquiryByStatus,
  getAdmissionInquiryByAssignedStaff
} = require("../repositories/admissionInquiryRepository");

// Create
const createAdmissionInquiryService = async (data) => {

  if (!data.student_name) {
    throw new Error("Student name is required");
  }

  if (!data.mobile_no) {
    throw new Error("Mobile number is required");
  }

  if (!data.school_id) {
    throw new Error("School is required");
  }

  if (!data.academic_year_id) {
    throw new Error("Academic Year is required");
  }

  const duplicate = await checkDuplicateInquiry(
    data.mobile_no,
    data.academic_year_id
  );

  if (duplicate.length > 0) {
    throw new Error(
      "Admission inquiry already exists."
    );
  }

  data.inquiry_status =
    data.inquiry_status || "New";

  data.status =
    data.status || "Pending";

  return await createAdmissionInquiry(data);

};

// Get All
const getAllAdmissionInquiriesService = async (user) => {

  if (user.role === "SUPER_ADMIN") {

    return await getAllAdmissionInquiries();

  }

  if (user.role === "SCHOOL_ADMIN") {

    return await getAdmissionInquiriesBySchool(
      user.schoolId
    );

  }

  throw new Error("Unauthorized");

};

// Get By Id
const getAdmissionInquiryByIdService = async (id) => {

  return await getAdmissionInquiryById(id);

};

// Update
const updateAdmissionInquiryService = async (
  id,
  data
) => {

  return await updateAdmissionInquiry(
    id,
    data
  );

};

// Delete
const deleteAdmissionInquiryService = async (id) => {

  return await deleteAdmissionInquiry(id);

};

const searchAdmissionInquiryService = async (
  keyword
) => {

  return await searchAdmissionInquiry(
    keyword
  );

};

const getAdmissionInquiryByStatusService =
async (status) => {

  return await getAdmissionInquiryByStatus(
    status
  );

};

const getAdmissionInquiryByAssignedStaffService =
async (staffId) => {

  return await getAdmissionInquiryByAssignedStaff(
    staffId
  );

};


module.exports = {
  createAdmissionInquiryService,
  getAllAdmissionInquiriesService,
  getAdmissionInquiryByIdService,
  updateAdmissionInquiryService,
  deleteAdmissionInquiryService,
  searchAdmissionInquiryService,
  getAdmissionInquiryByStatusService,
  getAdmissionInquiryByAssignedStaffService
};