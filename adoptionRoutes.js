const express = require("express");
const router = express.Router();

const {
  createAdoptionRequest,
  getAdoptions,
  updateAdoptionStatus,
} = require("../controllers/adoptionController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// User expresses interest
router.post("/", protect, authorize("user"), createAdoptionRequest);

// NGO dashboard - view all adoption requests
router.get("/", protect, authorize("ngo"), getAdoptions);

// NGO updates adoption status
router.put(
  "/:id",
  protect,
  authorize("ngo"),
  updateAdoptionStatus
);

module.exports = router;