const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET PROFILE
// ============================================================

const getProfile = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE PROFILE
// ============================================================

const createProfile = async (profileData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    user_id,
    full_name,
    professional_title,
    bio,
    profile_image_url,
    location,
    email,
    phone,
    github_url,
    linkedin_url,
    twitter_url,
    resume_url,
    years_of_experience,
  } = profileData;

  const { data, error } = await supabase
    .from("profile")
    .insert({
      user_id,
      full_name,
      professional_title: professional_title || null,
      bio: bio || null,
      profile_image_url: profile_image_url || null,
      location: location || null,
      email: email || null,
      phone: phone || null,
      github_url: github_url || null,
      linkedin_url: linkedin_url || null,
      twitter_url: twitter_url || null,
      resume_url: resume_url || null,
      years_of_experience:
        years_of_experience ?? null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// UPDATE PROFILE
// ============================================================

const updateProfile = async (
  id,
  profileData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const updates = {};

  if (profileData.user_id !== undefined) {
    updates.user_id = profileData.user_id;
  }

  if (profileData.full_name !== undefined) {
    updates.full_name = profileData.full_name;
  }

  if (profileData.professional_title !== undefined) {
    updates.professional_title =
      profileData.professional_title || null;
  }

  if (profileData.bio !== undefined) {
    updates.bio = profileData.bio || null;
  }

  if (profileData.profile_image_url !== undefined) {
    updates.profile_image_url =
      profileData.profile_image_url || null;
  }

  if (profileData.location !== undefined) {
    updates.location = profileData.location || null;
  }

  if (profileData.email !== undefined) {
    updates.email = profileData.email || null;
  }

  if (profileData.phone !== undefined) {
    updates.phone = profileData.phone || null;
  }

  if (profileData.github_url !== undefined) {
    updates.github_url = profileData.github_url || null;
  }

  if (profileData.linkedin_url !== undefined) {
    updates.linkedin_url = profileData.linkedin_url || null;
  }

  if (profileData.twitter_url !== undefined) {
    updates.twitter_url = profileData.twitter_url || null;
  }

  if (profileData.resume_url !== undefined) {
    updates.resume_url = profileData.resume_url || null;
  }

  if (profileData.years_of_experience !== undefined) {
    updates.years_of_experience =
      profileData.years_of_experience ?? null;
  }

  const { data, error } = await supabase
    .from("profile")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Profile not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE PROFILE
// ============================================================

const deleteProfile = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("profile")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Profile not found");
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};