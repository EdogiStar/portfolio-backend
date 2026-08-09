const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET PUBLISHED PROJECTS
// ============================================================

const getPublishedProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      short_description,
      github_url,
      live_url,
      featured,
      created_at,
      project_images (
        id,
        image_url,
        alt_text,
        display_order,
        is_cover
      ),
      project_technologies (
        technologies (
          id,
          name,
          slug,
          icon
        )
      )
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// GET SINGLE PUBLISHED PROJECT
// ============================================================

const getPublishedProjectBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      short_description,
      description,
      github_url,
      live_url,
      featured,
      created_at,
      updated_at,
      project_images (
        id,
        image_url,
        alt_text,
        display_order,
        is_cover
      ),
      project_technologies (
        technologies (
          id,
          name,
          slug,
          icon
        )
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Project not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// GET ALL PROJECTS FOR ADMIN
// ============================================================

const getAllProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      short_description,
      description,
      github_url,
      live_url,
      featured,
      status,
      created_at,
      updated_at,
      project_images (
        id,
        image_url,
        alt_text,
        display_order,
        is_cover
      ),
      project_technologies (
        technologies (
          id,
          name,
          slug,
          icon
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE PROJECT
// ============================================================

const createProject = async (projectData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);
  const {
    title,
    slug,
    short_description,
    description,
    github_url,
    live_url,
    featured,
    status,
  } = projectData;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      slug,
      short_description,
      description,
      github_url,
      live_url,
      featured,
      status,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// UPDATE PROJECT
// ============================================================

const updateProject = async (id, projectData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("projects")
    .update(projectData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Project not found");
    }

    throw new Error(error.message);
  }

  return data;
};

// ============================================================
// DELETE PROJECT
// ============================================================

const deleteProject = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Project not found");
    }

    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getPublishedProjects,
  getPublishedProjectBySlug,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};