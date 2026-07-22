const {
    createFollowUp,
    getAllFollowUps,
    getFollowUpsBySchool,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp,
    checkDuplicateFollowUp,
    searchFollowUps,
    getFollowUpsByInquiry,
    getFollowUpsByStaff,
    getFollowUpsByStatus
} = require("../repositories/admissionFollowUpRepository");

// Create
const createFollowUpService = async (data) => {

    if (!data.inquiry_id) {
        throw new Error("Inquiry is required");
    }

    if (!data.follow_up_date) {
        throw new Error("Follow Up Date is required");
    }

    if (!data.response_status) {
        throw new Error("Response Status is required");
    }

    if (!data.followed_up_by_staff_id) {
        throw new Error("Follow Up Staff is required");
    }

    const duplicate = await checkDuplicateFollowUp(
        data.inquiry_id,
        data.follow_up_date
    );

    if (duplicate.length > 0) {
        throw new Error("Follow Up already exists for this date.");
    }

    return await createFollowUp(data);
};

// Get All
const getAllFollowUpsService = async (user) => {

    if (user.role === "SUPER_ADMIN") {
        return await getAllFollowUps();
    }

    if (user.role === "SCHOOL_ADMIN") {
        return await getFollowUpsBySchool(user.schoolId);
    }

    throw new Error("Unauthorized");
};

// Get By Id
const getFollowUpByIdService = async (id) => {

    return await getFollowUpById(id);
};

// Update
const updateFollowUpService = async (id, data) => {

    return await updateFollowUp(id, data);
};

// Delete
const deleteFollowUpService = async (id) => {

    return await deleteFollowUp(id);
};

// Search
const searchFollowUpsService = async (keyword) => {

    return await searchFollowUps(keyword);
};

// Filter By Inquiry
const getFollowUpsByInquiryService = async (inquiryId) => {

    return await getFollowUpsByInquiry(inquiryId);
};

// Filter By Staff
const getFollowUpsByStaffService = async (staffId) => {

    return await getFollowUpsByStaff(staffId);
};

// Filter By Status
const getFollowUpsByStatusService = async (status) => {

    return await getFollowUpsByStatus(status);
};

module.exports = {
    createFollowUpService,
    getAllFollowUpsService,
    getFollowUpByIdService,
    updateFollowUpService,
    deleteFollowUpService,
    searchFollowUpsService,
    getFollowUpsByInquiryService,
    getFollowUpsByStaffService,
    getFollowUpsByStatusService
};