const contactMessageService = require("../services/contactMessage.service");

// ============================================================
// CREATE CONTACT MESSAGE
// Public endpoint
// ============================================================

const createContactMessage = async (req, res, next) => {
  try {
    const message = await contactMessageService.createContactMessage(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET ALL CONTACT MESSAGES
// Admin only
// ============================================================

const getContactMessages = async (req, res, next) => {
  try {
    const messages =
      await contactMessageService.getContactMessages(
        req.accessToken
      );

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE CONTACT MESSAGE
// Admin only
// ============================================================

const updateContactMessage = async (req, res, next) => {
  try {
    const message =
      await contactMessageService.updateContactMessage(
        req.params.id,
        req.body,
        req.accessToken
      );

    res.status(200).json({
      success: true,
      message: "Contact message updated successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE CONTACT MESSAGE
// Admin only
// ============================================================

const deleteContactMessage = async (req, res, next) => {
  try {
    const message =
      await contactMessageService.deleteContactMessage(
        req.params.id,
        req.accessToken
      );

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
};