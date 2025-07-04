export const extractPublicId = (cloudinaryUrl) => {
  try {
    const parts = cloudinaryUrl.split("/");
    const versionIndex = parts.findIndex((p) => p.startsWith("v"));
    const pathParts = parts.slice(versionIndex + 1); // ['folder', 'filename.jpg']
    const fileName = pathParts.pop().split(".")[0]; // 'filename'
    const folder = pathParts.join("/"); // 'folder' (nếu có)
    return folder ? `${folder}/${fileName}` : fileName;
  } catch (err) {
    console.error("Lỗi extractPublicId:", err);
    return null;
  }
};
