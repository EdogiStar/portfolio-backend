const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const {
  getPublishedProjects,
  getPublishedProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();


// ============================================================
// ADMIN ROUTES
// ============================================================

router.get(
  "/admin/all",
  authenticate,
  requireRole("admin"),
  getAllProjects
);

router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createProject
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateProject
);

router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteProject
);

// ============================================================
// PUBLIC ROUTES
// ============================================================

router.get("/", getPublishedProjects);

router.get("/:slug", getPublishedProjectBySlug);


module.exports = router;