const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills.controller");

const router = express.Router();


// ============================================================
// PUBLIC
// ============================================================

router.get("/", getSkills);


// ============================================================
// ADMIN
// ============================================================

router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createSkill
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateSkill
);

router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteSkill
);


module.exports = router;