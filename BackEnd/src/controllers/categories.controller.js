import categoriesServices from "../controllers/categories.controller.js";

const getAllCategories = async (req, res) => {
  try {
    const data = await categoriesServices.getAllCategories();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy thể loại thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Lấy thể loại thất bại",
      });
    }
  } catch (error) {
    console.log("Lỗi: ", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server",
    });
  }
};

const createCategories = async (req, res) => {
  try {
    const { name, slug, menu_id } = req.body;
    const data = await categoriesServices.createCategories(name, slug, menu_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Tạo thể loại thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Tạo thể loại thất bại",
      });
    }
  } catch (error) {
    console.log("Lỗi: ", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server",
    });
  }
};

const updateCategories = async (req, res) => {
  try {
    const { categories_id } = req.params;
    const { name, slug, menu_id } = req.body;
    const data = await categoriesServices.updateCategories(
      categories_id,
      name,
      slug,
      menu_id
    );
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thay đổi thể loại thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thay đổi thể loại thất bại",
      });
    }
  } catch (error) {
    console.log("Lỗi: ", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server",
    });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { categories_id } = req.params;
    const data = await categoriesServices.deleteCategories(categories_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Xóa thể loại thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Xóa thể loại thất bại",
      });
    }
  } catch (error) {
    console.log("Lỗi: ", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server",
    });
  }
};

export default {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
};
