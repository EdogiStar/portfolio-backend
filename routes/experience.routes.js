const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience.controller");

const router = express.Router();


// ============================================================
// PUBLIC
// ============================================================

router.get("/", getExperience);


// ============================================================
// ADMIN
// ============================================================

router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createExperience
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateExperience
);

router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteExperience
);


module.exports = router;