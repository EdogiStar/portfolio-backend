const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");
const upload = require("../middleware/upload");

const {
  uploadProjectImage,
  deleteProjectImage,
} = require("../controllers/projectImage.controller");

const router = express.Router();


// ============================================================
// ADMIN ROUTES
// ============================================================

router.post(
  "/:projectId/images",
  authenticate,
  requireRole("admin"),
  upload.single("image"),
  uploadProjectImage
);

router.delete(
  "/images/:imageId",
  authenticate,
  requireRole("admin"),
  deleteProjectImage
);


module.exports = router;