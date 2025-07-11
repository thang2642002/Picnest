import userService from "../services/user.service.js";

const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy thông tin người dùng thành công",
        data: data,
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
      message: "Lỗi Server, xóa người dùng thất bại",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const data = await userService.loginUser(email, password);
    console.log("data", data);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Đăng nhập thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  } catch (error) {
    console.log("Lỗi: ", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server, đăng nhập thất bại",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Đăng xuất thành công", errCode: 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đăng xuất thất bại", errCode: -1 });
  }
};

export default {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
