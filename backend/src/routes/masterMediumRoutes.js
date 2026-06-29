const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const {
createMasterMedium,
getAllMasterMediums,
getMasterMediumById,
updateMasterMedium,
deleteMasterMedium
} = require(
"../controllers/masterMediumController"
);

router.post(
"/",
authMiddleware,
createMasterMedium
);

router.get(
"/",
authMiddleware,
getAllMasterMediums
);

router.get(
"/:id",
authMiddleware,
getMasterMediumById
);

router.put(
"/:id",
authMiddleware,
updateMasterMedium
);

router.delete(
"/:id",
authMiddleware,
deleteMasterMedium
);

module.exports = router;
