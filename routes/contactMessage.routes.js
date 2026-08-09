const express = require("express");

const authenticate = require("../middleware/authenticate");
const requireRole = require("../middleware/requireRole");

const {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
} = require("../controllers/contactMessage.controller");

const router = express.Router();


// ============================================================
// PUBLIC
// ============================================================

// Anyone can submit a contact message
router.post("/", createContactMessage);


// ============================================================
// ADMIN
// ============================================================

// View all contact messages
router.get(
  "/",
  authenticate,
  requireRole("admin"),
  getContactMessages
);

// Update a contact message
router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  updateContactMessage
);

// Delete a contact message
router.delete(
  "/:id",
  authenticate,
  requireRole("admin"),
  deleteContactMessage
);


module.exports = router;