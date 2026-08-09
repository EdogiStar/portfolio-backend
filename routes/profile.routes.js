const express = require("express");

const {
  getProfileController,
  createProfileController,
  updateProfileController,
  deleteProfileController,
} = require("../controllers/profile.controller");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

// ============================================================
// PUBLIC
// ============================================================

// Get portfolio profile
router.get("/", getProfileController);


// ============================================================
// ADMIN
// ============================================================

// Create profile
router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createProfileController
);

// Update profile
router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateProfileController
);

// Delete profile
router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteProfileController
);


module.exports = router;