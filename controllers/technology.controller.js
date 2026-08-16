const {
  getTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
} = require("../services/technology.service");

// ============================================================
// GET ALL TECHNOLOGIES
// ============================================================

const getTechnologiesController = async (req, res, next) => {
  try {
    const technologies = await getTechnologies();

    res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET TECHNOLOGY BY ID
// ============================================================

const getTechnologyByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const technology = await getTechnologyById(id);

    res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE TECHNOLOGY
// ============================================================

const createTechnologyController = async (req, res, next) => {
  try {
    const technology = await createTechnology(
      req.body,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Technology created successfully",
      data: technology,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE TECHNOLOGY
// ============================================================

const updateTechnologyController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const technology = await updateTechnology(
      id,
      req.body,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Technology updated successfully",
      data: technology,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE TECHNOLOGY
// ============================================================

const deleteTechnologyController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const technology = await deleteTechnology(
      id,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Technology deleted successfully",
      data: technology,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET PROJECT TECHNOLOGIES
// ============================================================

const getProjectTechnologiesController = async (
  req,
  res,
  next
) => {
  try {
    const { projectId } = req.params;

    const technologies = await getProjectTechnologies(projectId);

    res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// ADD TECHNOLOGY TO PROJECT
// ============================================================

const addTechnologyToProjectController = async (
  req,
  res,
  next
) => {
  try {
    const { projectId } = req.params;
    const { technology_id } = req.body;

    const relationship = await addTechnologyToProject(
      projectId,
      technology_id,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Technology added to project successfully",
      data: relationship,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// REMOVE TECHNOLOGY FROM PROJECT
// ============================================================

const removeTechnologyFromProjectController = async (
  req,
  res,
  next
) => {
  try {
    const { projectId, technologyId } = req.params;

    const relationship = await removeTechnologyFromProject(
      projectId,
      technologyId,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Technology removed from project successfully",
      data: relationship,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getTechnologiesController,
  getTechnologyByIdController,
  createTechnologyController,
  updateTechnologyController,
  deleteTechnologyController,
  getProjectTechnologiesController,
  addTechnologyToProjectController,
  removeTechnologyFromProjectController,
};