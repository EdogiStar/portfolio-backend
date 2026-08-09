const createAuthenticatedClient = require("../config/supabaseClient");

const BUCKET_NAME = "project-images";


// ============================================================
// UPLOAD PROJECT IMAGE
// ============================================================

const uploadProjectImage = async (
  file,
  projectId,
  imageData,
  accessToken
) => {
  const supabase = createAuthenticatedClient(accessToken);

  const fileExtension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${fileExtension}`;

  const filePath = `${projectId}/${fileName}`;


  // ----------------------------------------------------------
  // Upload to Supabase Storage
  // ----------------------------------------------------------

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }


  // ----------------------------------------------------------
  // Get public URL
  // ----------------------------------------------------------

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);


  // ----------------------------------------------------------
  // If this is the new cover image,
  // remove cover status from the existing cover.
  // ----------------------------------------------------------

  if (imageData.is_cover) {
    const { error: coverError } = await supabase
      .from("project_images")
      .update({
        is_cover: false,
      })
      .eq("project_id", projectId)
      .eq("is_cover", true);

    if (coverError) {
      await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      throw new Error(coverError.message);
    }
  }


  // ----------------------------------------------------------
  // Save image metadata
  // ----------------------------------------------------------

  const { data, error } = await supabase
    .from("project_images")
    .insert({
      project_id: projectId,
      image_url: publicUrl,
      alt_text: imageData.alt_text || null,
      display_order: imageData.display_order || 0,
      is_cover: imageData.is_cover || false,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    throw new Error(error.message);
  }

  return data;
};


// ============================================================
// DELETE PROJECT IMAGE
// ============================================================

const deleteProjectImage = async (imageId, accessToken) => {
  const supabase = createAuthenticatedClient(accessToken);


  // ----------------------------------------------------------
  // Get image
  // ----------------------------------------------------------

  const { data: image, error: imageError } = await supabase
    .from("project_images")
    .select("id, image_url")
    .eq("id", imageId)
    .single();

  if (imageError || !image) {
    throw new Error("Project image not found");
  }


  // ----------------------------------------------------------
  // Extract storage path
  // ----------------------------------------------------------

  const publicUrl = image.image_url;

  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;

  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error("Invalid project image URL");
  }

  const filePath = publicUrl.substring(
    markerIndex + marker.length
  );


  // ----------------------------------------------------------
  // Delete from Storage
  // ----------------------------------------------------------

  const { error: storageError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (storageError) {
    throw new Error(storageError.message);
  }


  // ----------------------------------------------------------
  // Delete database record
  // ----------------------------------------------------------

  const { error: deleteError } = await supabase
    .from("project_images")
    .delete()
    .eq("id", imageId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return image;
};


module.exports = {
  uploadProjectImage,
  deleteProjectImage,
};