const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET ALL EDUCATION
// ============================================================

const getEducation = async () => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE EDUCATION
// ============================================================

const createEducation = async (educationData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    institution,
    degree,
    field_of_study,
    location,
    start_date,
    end_date,
    description,
    display_order,
  } = educationData;

  const { data, error } = await supabase
    .from("education")
    .insert({
      institution,
      degree,
      field_of_study: field_of_study || null,
      location: location || null,
      start_date: start_date || null,
      end_date: end_date || null,
      description: description || null,
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
// UPDATE EDUCATION
// ============================================================

const updateEducation = async (
  id,
  educationData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    institution,
    degree,
    field_of_study,
    location,
    start_date,
    end_date,
    description,
    display_order,
  } = educationData;

  const updates = {
    institution,
    degree,
    field_of_study: field_of_study || null,
    location: location || null,
    start_date: start_date || null,
    end_date: end_date || null,
    description: description || null,
    display_order: display_order ?? 0,
  };

  const { data, error } = await supabase
    .from("education")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Education record not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE EDUCATION
// ============================================================

const deleteEducation = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("education")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Education record not found");
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};