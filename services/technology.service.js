const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET ALL TECHNOLOGIES
// ============================================================

const getTechnologies = async () => {
  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// GET TECHNOLOGY BY ID
// ============================================================

const getTechnologyById = async (id) => {
  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Technology not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE TECHNOLOGY
// ============================================================

const createTechnology = async (technologyData, accessToken) => {
  const authenticatedSupabase =
    createAuthenticatedClient(accessToken);

  const {
    name,
    slug,
    icon,
  } = technologyData;

  const { data, error } = await authenticatedSupabase
    .from("technologies")
    .insert({
      name,
      slug,
      icon: icon || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// UPDATE TECHNOLOGY
// ============================================================

const updateTechnology = async (
  id,
  technologyData,
  accessToken
) => {
  const authenticatedSupabase =
    createAuthenticatedClient(accessToken);

  const updates = {};

  if (technologyData.name !== undefined) {
    updates.name = technologyData.name;
  }

  if (technologyData.slug !== undefined) {
    updates.slug = technologyData.slug;
  }

  if (technologyData.icon !== undefined) {
    updates.icon = technologyData.icon || null;
  }

  const { data, error } = await authenticatedSupabase
    .from("technologies")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Technology not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE TECHNOLOGY
// ============================================================

const deleteTechnology = async (id, accessToken) => {
  const authenticatedSupabase =
    createAuthenticatedClient(accessToken);

  const { data, error } = await authenticatedSupabase
    .from("technologies")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Technology not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// GET TECHNOLOGIES FOR A PROJECT
// ============================================================

const getProjectTechnologies = async (projectId) => {
  const { data, error } = await supabase
    .from("project_technologies")
    .select(`
      technology_id,
      technologies (
        id,
        name,
        slug,
        icon
      )
    `)
    .eq("project_id", projectId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((item) => item.technologies);
};


// ============================================================
// ADD TECHNOLOGY TO PROJECT
// ============================================================

const addTechnologyToProject = async (
  projectId,
  technologyId,
  accessToken
) => {
  const authenticatedSupabase =
    createAuthenticatedClient(accessToken);

  const { data, error } = await authenticatedSupabase
    .from("project_technologies")
    .insert({
      project_id: projectId,
      technology_id: technologyId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// REMOVE TECHNOLOGY FROM PROJECT
// ============================================================

const removeTechnologyFromProject = async (
  projectId,
  technologyId,
  accessToken
) => {
  const authenticatedSupabase =
    createAuthenticatedClient(accessToken);

  const { data, error } = await authenticatedSupabase
    .from("project_technologies")
    .delete()
    .eq("project_id", projectId)
    .eq("technology_id", technologyId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error(
        "Project technology relationship not found"
      );
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  getTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
};