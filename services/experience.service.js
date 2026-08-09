const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET ALL EXPERIENCE
// ============================================================

const getExperience = async () => {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE EXPERIENCE
// ============================================================

const createExperience = async (experienceData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    job_title,
    company,
    location,
    employment_type,
    start_date,
    end_date,
    is_current,
    description,
    technologies,
    display_order,
  } = experienceData;

  const { data, error } = await supabase
    .from("experience")
    .insert({
      job_title,
      company,
      location: location || null,
      employment_type: employment_type || null,
      start_date,
      end_date: end_date || null,
      is_current: is_current ?? false,
      description: description || null,
      technologies: technologies || null,
      display_order: display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// UPDATE EXPERIENCE
// ============================================================

const updateExperience = async (
  id,
  experienceData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    job_title,
    company,
    location,
    employment_type,
    start_date,
    end_date,
    is_current,
    description,
    technologies,
    display_order,
  } = experienceData;

  const updates = {
    job_title,
    company,
    location: location || null,
    employment_type: employment_type || null,
    start_date,
    end_date: end_date || null,
    is_current: is_current ?? false,
    description: description || null,
    technologies: technologies || null,
    display_order: display_order ?? 0,
  };

  const { data, error } = await supabase
    .from("experience")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Experience not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE EXPERIENCE
// ============================================================

const deleteExperience = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Experience not found");
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};