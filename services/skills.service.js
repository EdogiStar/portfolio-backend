const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// GET ALL SKILLS
// ============================================================

const getSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// CREATE SKILL
// ============================================================

const createSkill = async (skillData, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    name,
    category,
    icon,
    description,
    display_order,
  } = skillData;

  const { data, error } = await supabase
    .from("skills")
    .insert({
      name,
      category,
      icon: icon || null,
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
// UPDATE SKILL
// ============================================================

const updateSkill = async (
  id,
  skillData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const {
    name,
    category,
    icon,
    description,
    display_order,
  } = skillData;

  const updates = {
    name,
    category,
    icon: icon || null,
    description: description || null,
    display_order: display_order ?? 0,
  };

  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Skill not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE SKILL
// ============================================================

const deleteSkill = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Skill not found");
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
