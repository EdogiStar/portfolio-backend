const projectService = require("../services/project.service");


// ============================================================
// GET PUBLISHED PROJECTS
// ============================================================

const getPublishedProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getPublishedProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET SINGLE PUBLISHED PROJECT
// ============================================================

const getPublishedProjectBySlug = async (req, res, next) => {
  try {
    const project = await projectService.getPublishedProjectBySlug(
      req.params.slug
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET ALL PROJECTS - ADMIN
// ============================================================

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE PROJECT
// ============================================================

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(
  req.body,
  req.accessToken
);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE PROJECT
// ============================================================

const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
  req.params.id,
  req.body,
  req.accessToken
);

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE PROJECT
// ============================================================

const deleteProject = async (req, res, next) => {
  try {
    const project = await projectService.deleteProject(
  req.params.id,
  req.accessToken
);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getPublishedProjects,
  getPublishedProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};