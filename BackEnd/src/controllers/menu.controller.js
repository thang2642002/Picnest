import menuService from "../services/menu.service.js";

const getAllMenu = async (req, res) => {
  try {
    const data = await menuService.getAllMenu();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy menu thành công",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Lấy menu thất bại",
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

const createMenu = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const data = await menuService.createMenu(name, slug);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thêm menu thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thêm menu thất bại",
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

const updateMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { name, slug } = req.body;
    const data = await menuService.updateMenu(menu_id, name, slug);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thay đổi menu thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thay đổi menu thất bại",
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

const deleteMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;

    const data = await menuService.deleteMenu(menu_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Xóa menu thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Xóa menu thất bại",
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

export default { getAllMenu, createMenu, updateMenu, deleteMenu };
