const educationService = require("../services/education.service");

// ============================================================
// GET ALL EDUCATION
// ============================================================

const getEducation = async (req, res, next) => {
  try {
    const education = await educationService.getEducation();

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE EDUCATION
// ============================================================

const createEducation = async (req, res, next) => {
  try {
    const education = await educationService.createEducation(
      req.body,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE EDUCATION
// ============================================================

const updateEducation = async (req, res, next) => {
  try {
    const education = await educationService.updateEducation(
      req.params.id,
      req.body,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE EDUCATION
// ============================================================

const deleteEducation = async (req, res, next) => {
  try {
    const education = await educationService.deleteEducation(
      req.params.id,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
      data: education,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};