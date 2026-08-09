const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/education.controller");

const router = express.Router();


// ============================================================
// PUBLIC
// ============================================================

router.get("/", getEducation);


// ============================================================
// ADMIN
// ============================================================

router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createEducation
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateEducation
);

router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteEducation
);


module.exports = router;