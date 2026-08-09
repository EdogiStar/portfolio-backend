const supabase = require("../config/supabase");
const createAuthenticatedClient = require("../config/supabaseClient");

// ============================================================
// CREATE CONTACT MESSAGE
// ============================================================

const createContactMessage = async (messageData) => {
  const {
    name,
    email,
    subject,
    message,
  } = messageData;

  const { error } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      subject: subject || null,
      message,
    });

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

// ============================================================
// GET ALL CONTACT MESSAGES
// ============================================================

const getContactMessages = async (accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// UPDATE CONTACT MESSAGE
// ============================================================

const updateContactMessage = async (
  id,
  messageData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const updates = {};

  if (messageData.name !== undefined) {
    updates.name = messageData.name;
  }

  if (messageData.email !== undefined) {
    updates.email = messageData.email;
  }

  if (messageData.subject !== undefined) {
    updates.subject = messageData.subject || null;
  }

  if (messageData.message !== undefined) {
    updates.message = messageData.message;
  }

  if (messageData.status !== undefined) {
    updates.status = messageData.status;
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Contact message not found");
    }

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE CONTACT MESSAGE
// ============================================================

const deleteContactMessage = async (id, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);

  const { data, error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Contact message not found");
    }

    throw new Error(error.message);
  }

  return data;
};


module.exports = {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
};