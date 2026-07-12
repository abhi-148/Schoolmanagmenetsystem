const express =
require("express");

const router =
express.Router();

const {
createDepartment,
getAllDepartments,
updateDepartment,
deleteDepartment
} =
require("../controllers/staffDepartmentController");

const authMiddleware =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");

router.post(
"/",
authMiddleware,
authorizeRoles(
"SUPER_ADMIN",
"SCHOOL_ADMIN"
),
createDepartment
);

router.get(
"/",
authMiddleware,
getAllDepartments
);

router.put(
"/:id",
authMiddleware,
authorizeRoles(
"SUPER_ADMIN",
"SCHOOL_ADMIN"
),
updateDepartment
);

router.delete(
"/:id",
authMiddleware,
authorizeRoles(
"SUPER_ADMIN"
),
deleteDepartment
);

module.exports =
router;