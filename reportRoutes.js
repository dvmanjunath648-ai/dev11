const express = require("express");
const router = express.Router();

// =============================
// Import Controllers
// =============================
const {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

// =============================
// Import Middlewares
// =============================
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");


// ======================================================
// CREATE REPORT (Only Logged-in Users)
// ======================================================
router.post(
  "/",
  protect,
  authorizeRoles("user", "admin", "rescuer"), // allow multiple roles if needed
  upload.single("image"),
  createReport
);


// ======================================================
// GET ALL REPORTS (Public)
// ======================================================
router.get("/", getReports);


// ======================================================
// GET SINGLE REPORT (Public)
// IMPORTANT: Keep this AFTER "/" route
// ======================================================
router.get("/:id", getReportById);


// ======================================================
// UPDATE REPORT (Admin or Rescuer Only)
// Optional image upload allowed
// ======================================================
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "rescuer"),
  upload.single("image"), // optional if updating image
  updateReport
);


// ======================================================
// DELETE REPORT (Admin Only)
// ======================================================
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteReport
);


// Export Router
module.exports = router;