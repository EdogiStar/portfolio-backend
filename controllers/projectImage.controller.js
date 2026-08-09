const projectImageService = require("../services/projectImage.service");


// ============================================================
// UPLOAD PROJECT IMAGE
// ============================================================

const uploadProjectImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const imageData = {
      alt_text: req.body.alt_text,
      display_order: Number(req.body.display_order) || 0,
      is_cover: req.body.is_cover === "true",
    };

    const image = await projectImageService.uploadProjectImage(
      req.file,
      req.params.projectId,
      imageData,
      req.accessToken
    );

    res.status(201).json({
      success: true,
      message: "Project image uploaded successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE PROJECT IMAGE
// ============================================================

const deleteProjectImage = async (req, res, next) => {
  try {
    const image = await projectImageService.deleteProjectImage(
      req.params.imageId,
      req.accessToken
    );

    res.status(200).json({
      success: true,
      message: "Project image deleted successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  uploadProjectImage,
  deleteProjectImage,
};