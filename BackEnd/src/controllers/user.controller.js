import userService from "../services/user.service.js";

const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy thông tin người dùng thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Lấy thông tin người dùng thất bại",
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

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const data = await userService.createUser(name, email, password, role);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Tạo mới người dùng thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Tạo mới người dùng thất bại",
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

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email, password, role } = req.body;
    const data = await userService.updateUser(
      user_id,
      name,
      email,
      password,
      role
    );
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thay đổi người dùng thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thay đổi người dùng thất bại",
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

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await userService.deleteUser(user_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Xóa người dùng thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Xóa người dùng thất bại",
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

export default { getAllUser, createUser, updateUser, deleteUser };
