import db from "../models/index.js";
import { slugify } from "../utils/slugify.js";

const getAllCategories = async () => {
  try {
    const data = await db.Category.findAll({
      include: [
        {
          model: db.Menu,
          as: "menu",
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async (name, slug, menu_id) => {
  try {
    const slug_url = slugify(name);
    const data = await db.Category.create({ name, slug, slug_url, menu_id });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const updateCategories = async (categories_id, name, slug, menu_id) => {
  try {
    const data = await db.Category.findByPk(categories_id);
    if (data) {
      const slug_url = slugify(name);
      await data.update({
        name,
        slug,
        slug_url,
        menu_id,
      });
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategories = async (categories_id) => {
  try {
    console.log("categories_id", categories_id);
    const data = await db.Category.destroy({
      where: {
        categories_id: categories_id,
      },
    });
    console.log("data", data);
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};
