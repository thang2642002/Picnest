import db from "../models/index.js";

const getAllMenu = async () => {
  try {
    const data = await db.Menu.findAll({
      include: [
        {
          model: db.Category,
          as: "categories",
        },
      ],
    });
    if (data) {
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const createMenu = async (name, slug) => {
  try {
    const data = await db.Menu.create({ name, slug }); // CHỈ ĐƯỢC GỌI db.Menu
    return data;
  } catch (error) {
    console.log("❌ Lỗi khi tạo menu:", error);
    throw error;
  }
};

const updateMenu = async (menu_id, name, slug) => {
  try {
    const data = await db.Menu.findByPk(menu_id);
    if (data) {
      await data.update({ name, slug });
      return data;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

const deleteMenu = async (menu_id) => {
  try {
    const data = await db.Menu.destroy({
      where: { menu_id: menu_id },
    });
    if (data) {
      return data;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export default { getAllMenu, createMenu, updateMenu, deleteMenu };
