const {
    createFollowUpService,
    getAllFollowUpsService,
    getFollowUpByIdService,
    updateFollowUpService,
    deleteFollowUpService,
    searchFollowUpsService,
    getFollowUpsByInquiryService,
    getFollowUpsByStaffService,
    getFollowUpsByStatusService
} = require("../services/admissionFollowUpService");

// Create
const createFollowUp = async (req, res) => {
    try {

        const result = await createFollowUpService({
            ...req.body,
            created_by: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Admission Follow Up Created Successfully",
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All
const getAllFollowUps = async (req, res) => {
    try {

        const data = await getAllFollowUpsService(req.user);

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get By Id
const getFollowUpById = async (req, res) => {
    try {

        const data = await getFollowUpByIdService(req.params.id);

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update
const updateFollowUp = async (req, res) => {
    try {

        await updateFollowUpService(req.params.id, {
            ...req.body,
            updated_by: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Admission Follow Up Updated Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete
const deleteFollowUp = async (req, res) => {
    try {

        await deleteFollowUpService(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Admission Follow Up Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Search
const searchFollowUps = async (req, res) => {
    try {

        const data = await searchFollowUpsService(
            req.query.keyword || ""
        );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Filter By Inquiry
const getFollowUpsByInquiry = async (req, res) => {
    try {

        const data = await getFollowUpsByInquiryService(
            req.params.inquiryId
        );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Filter By Staff
const getFollowUpsByStaff = async (req, res) => {
    try {

        const data = await getFollowUpsByStaffService(
            req.params.staffId
        );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Filter By Response Status
const getFollowUpsByStatus = async (req, res) => {
    try {

        const data = await getFollowUpsByStatusService(
            req.params.status
        );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createFollowUp,
    getAllFollowUps,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp,
    searchFollowUps,
    getFollowUpsByInquiry,
    getFollowUpsByStaff,
    getFollowUpsByStatus
};