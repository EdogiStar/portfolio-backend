const experienceService = require("../services/experience.service");

// ============================================================
// GET ALL EXPERIENCE
// ============================================================

const getExperience = async (req, res, next) => {
  try {
    const experience = await experienceService.getExperience();

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE EXPERIENCE
// ============================================================

const createExperience = async (req, res, next) => {
  try {
    const experience = await experienceService.createExperience(
      req.body,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE EXPERIENCE
// ============================================================

const updateExperience = async (req, res, next) => {
  try {
    const experience = await experienceService.updateExperience(
      req.params.id,
      req.body,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE EXPERIENCE
// ============================================================

const deleteExperience = async (req, res, next) => {
  try {
    const experience = await experienceService.deleteExperience(
      req.params.id,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};