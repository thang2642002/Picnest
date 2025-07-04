import db from "../models/index.js";
import { cloudinary } from "../config/cloudinary.js";
import { extractPublicId } from "../utils/cloudinaryHelper.js";

const getAllImage = async () => {
  try {
    const data = await db.Image.findAll();
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const createImage = async (file, title, categories_id) => {
  try {
    if (!file?.path || !file?.filename) {
      return null;
    }

    const image = await db.Image.create({
      url: file.path,
      title,
      categories_id,
    });

    return image;
  } catch (error) {
    console.log("Lỗi Service:", error);
    throw error;
  }
};

const updateImage = async (image_id, file, title, categories_id) => {
  try {
    const image = await db.Image.findByPk(image_id);
    if (!image) return null;

    if (file?.path) {
      const public_id = extractPublicId(image.url);
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
      image.url = file.path;
    }

    if (title !== undefined) image.title = title;
    if (categories_id !== undefined) image.categories_id = categories_id;

    await image.save();
    return image;
  } catch (error) {
    console.error("Lỗi Service updateImage:", error);
    throw error;
  }
};

const deleteImage = async (image_id) => {
  try {
    const image = await db.Image.findByPk(image_id);
    if (!image) return false;

    const public_id = extractPublicId(image.url);
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    await image.destroy();
    return true;
  } catch (error) {
    console.error("Lỗi Service deleteImage:", error);
    throw error;
  }
};

export default { getAllImage, createImage, updateImage, deleteImage };
