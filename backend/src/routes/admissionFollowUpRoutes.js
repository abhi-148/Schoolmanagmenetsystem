const express = require("express");

const router = express.Router();

const {
    createFollowUp,
    getAllFollowUps,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp,
    searchFollowUps,
    getFollowUpsByInquiry,
    getFollowUpsByStaff,
    getFollowUpsByStatus
} = require("../controllers/admissionFollowUpController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Create
router.post(
    "/",
    authMiddleware,
    authorizeRoles(
        "SUPER_ADMIN",
        "SCHOOL_ADMIN"
    ),
    createFollowUp
);

// Search
router.get(
    "/search",
    authMiddleware,
    searchFollowUps
);

// Filter By Inquiry
router.get(
    "/inquiry/:inquiryId",
    authMiddleware,
    getFollowUpsByInquiry
);

// Filter By Staff
router.get(
    "/staff/:staffId",
    authMiddleware,
    getFollowUpsByStaff
);

// Filter By Response Status
router.get(
    "/status/:status",
    authMiddleware,
    getFollowUpsByStatus
);

// Get All
router.get(
    "/",
    authMiddleware,
    getAllFollowUps
);

// Get By Id
router.get(
    "/:id",
    authMiddleware,
    getFollowUpById
);

// Update
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles(
        "SUPER_ADMIN",
        "SCHOOL_ADMIN"
    ),
    updateFollowUp
);

// Delete
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles(
        "SUPER_ADMIN"
    ),
    deleteFollowUp
);

module.exports = router;