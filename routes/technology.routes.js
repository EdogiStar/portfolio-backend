const express = require("express");

const {
  getTechnologiesController,
  getTechnologyByIdController,
  createTechnologyController,
  updateTechnologyController,
  deleteTechnologyController,
  getProjectTechnologiesController,
  addTechnologyToProjectController,
  removeTechnologyFromProjectController,
} = require("../controllers/technology.controller");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

// ============================================================
// TECHNOLOGIES
// ============================================================

// Admin
router.post(
  "/",
  authenticate,
  requireRole("admin"),
  createTechnologyController
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateTechnologyController
);

router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteTechnologyController
);


// ============================================================
// PROJECT TECHNOLOGIES
// ============================================================

// Public
router.get(
  "/project/:projectId",
  getProjectTechnologiesController
);

// Admin
router.post(
  "/project/:projectId",
  authenticate,
  requireRole("admin"),
  addTechnologyToProjectController
);

router.delete(
  "/project/:projectId/:technologyId",
  authenticate,
  requireRole("admin"),
  removeTechnologyFromProjectController
);

// Public
router.get("/", getTechnologiesController);
router.get("/:id", getTechnologyByIdController);


module.exports = router;