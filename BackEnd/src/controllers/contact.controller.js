import contactService from "../services/contact.service.js";

const getAllContact = async (req, res) => {
  try {
    const data = await contactService.getAllContact();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy thông tin liên hệ thành công",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Lấy thông tin liên hệ thất bại",
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

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const data = await contactService.createContact(name, email, message);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thêm liên hệ thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thêm liên hệ thất bại",
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

const deleteContact = async (req, res) => {
  try {
    const { contact_id } = req.params;
    const data = await contactService.deleteContact(contact_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Xóa liên hệ thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Xóa liên hệ thất bại",
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

export default { getAllContact, createContact, deleteContact };
