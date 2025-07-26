import imageService from "../services/images.service.js";

const getAllImage = async (req, res) => {
  try {
    const data = await imageService.getAllImage();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Lấy ảnh thành công",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Lấy ảnh thất bại",
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

const createImage = async (req, res) => {
  try {
    const { categories_id, titles } = req.body;
    const files = req.files;

    const result = await imageService.createImage(categories_id, files, titles);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      message: "Lỗi server khi tạo ảnh",
      errCode: -1,
    });
  }
};

// const createImage = async (req, res) => {
//   try {
//     const { title, categories_id } = req.body;
//     const file = req.file;
//     const data = await imageService.createImage(file, title, categories_id);

//     if (data) {
//       return res.status(200).json({
//         errCode: 0,
//         message: "Thêm ảnh thành công",
//       });
//     } else {
//       return res.status(400).json({
//         errCode: 1,
//         message: "Thêm ảnh thất bại",
//       });
//     }
//   } catch (error) {
//     console.error("Lỗi Controller:", error);
//     return res.status(500).json({
//       errCode: -1,
//       message: error.message || "Lỗi Server",
//     });
//   }
// };

// const updateImage = async (req, res) => {
//   try {
//     const { image_id } = req.params;
//     const { title, categories_id } = req.body;
//     const file = req.file;

//     const data = await imageService.updateImage(
//       image_id,
//       file,
//       title,
//       categories_id
//     );

//     if (data) {
//       return res.status(200).json({
//         errCode: 0,
//         message: "Thay đổi ảnh thành công",
//       });
//     } else {
//       return res.status(400).json({
//         errCode: 1,
//         message: "Thay đổi ảnh thất bại",
//       });
//     }
//   } catch (error) {
//     console.error("Lỗi Controller updateImage:", error);
//     return res.status(500).json({
//       errCode: -1,
//       message: "Lỗi Server: " + error.message,
//     });
//   }
// };

const updateImage = async (req, res) => {
  try {
    const { image_id } = req.params;
    const { title, categories_id } = req.body;
    const file = req.file;

    const data = await imageService.updateImage(
      image_id,
      file,
      title,
      categories_id
    );

    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Thay đổi ảnh thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Thay đổi ảnh thất bại",
      });
    }
  } catch (error) {
    console.error("Lỗi Controller updateImage:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi Server: " + error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { image_id } = req.params;

    const data = await imageService.deleteImage(image_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Xóa ảnh thành công",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Xóa ảnh thất bại",
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

export default { getAllImage, createImage, updateImage, deleteImage };
