const express = require("express");
const router = express.Router();
const {
  createClinic,
  getClinics,
  getNearbyClinics,
} = require("../controllers/clinicController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("ngo", "admin"), createClinic);
router.get("/", getClinics);
router.get("/nearby", getNearbyClinics);

module.exports = router;