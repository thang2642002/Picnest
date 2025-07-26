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

const createImage = async (categories_id, files, titles) => {
  if (!categories_id || !files || files.length === 0) {
    return {
      message: "Thiếu categories_id hoặc file ảnh",
      errCode: 1,
      statusCode: 400,
    };
  }

  const titlesArray = Array.isArray(titles) ? titles : [titles];

  if (titlesArray.length !== files.length) {
    return {
      message: "Số lượng tiêu đề không khớp với số lượng ảnh",
      errCode: 2,
      statusCode: 400,
    };
  }

  try {
    const images = files.map((file, index) => ({
      url: file.path,
      title: titlesArray[index],
      categories_id,
    }));

    const created = await db.Image.bulkCreate(images);

    return {
      message: "Tạo ảnh thành công",
      errCode: 0,
      statusCode: 201,
      data: created,
    };
  } catch (error) {
    console.error("Lỗi khi tạo ảnh:", error);
    return {
      message: "Lỗi server khi tạo ảnh",
      errCode: -1,
      statusCode: 500,
    };
  }
};

const updateImage = async (image_id, file, title, categories_id) => {
  if (!image_id && !file && !title && !categories_id) {
    return null;
  }
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
