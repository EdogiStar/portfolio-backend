const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../services/profile.service");

// ============================================================
// GET PROFILE
// ============================================================

const getProfileController = async (req, res, next) => {
  try {
    const profile = await getProfile();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CREATE PROFILE
// ============================================================

const createProfileController = async (req, res, next) => {
  try {
    const accessToken = req.accessToken;

    const profile = await createProfile(
      req.body,
      accessToken
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE PROFILE
// ============================================================

const updateProfileController = async (req, res, next) => {
  try {
    const accessToken = req.accessToken;
    const { id } = req.params;

    const profile = await updateProfile(
      id,
      req.body,
      accessToken
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DELETE PROFILE
// ============================================================

const deleteProfileController = async (req, res, next) => {
  try {
    const accessToken = req.accessToken;
    const { id } = req.params;

    const profile = await deleteProfile(
      id,
      accessToken
    );

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getProfileController,
  createProfileController,
  updateProfileController,
  deleteProfileController,
};