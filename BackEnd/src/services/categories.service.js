import db from "../models/index.js";
const getAllCategories = async () => {
  try {
    const data = await db.Category.findAll({
      include: [
        {
          model: db.Menu,
          as: "menu",
        },
      ],
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
    console.log(name, slug, menu_id);
    const data = await db.Category.create({ name, slug, menu_id });
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
      await data.update({
        name,
        slug,
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
