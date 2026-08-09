const skillsService = require("../services/skills.service");


// ============================================================
// GET ALL SKILLS
// ============================================================

const getSkills = async (req, res, next) => {
  try {
    const skills = await skillsService.getSkills();

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE SKILL
// ============================================================

const createSkill = async (req, res, next) => {
  try {
    const skill = await skillsService.createSkill(
      req.body,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE SKILL
// ============================================================

const updateSkill = async (req, res, next) => {
  try {
    const skill = await skillsService.updateSkill(
      req.params.id,
      req.body,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE SKILL
// ============================================================

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await skillsService.deleteSkill(
      req.params.id,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};