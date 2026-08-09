const createAuthenticatedClient = require("../config/supabaseClient");

const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.accessToken) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const supabase = createAuthenticatedClient(
        req.accessToken
      );

      const { data: profile, error } = await supabase
        .from("users")
        .select("id, name, role, status")
        .eq("id", req.user.id)
        .single();

      if (error || !profile) {
        return res.status(403).json({
          success: false,
          message: "User profile not found",
        });
      }

      if (profile.status !== "active") {
        return res.status(403).json({
          success: false,
          message: "Your account is inactive",
        });
      }

      if (profile.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
      }

      req.profile = profile;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = requireRole;