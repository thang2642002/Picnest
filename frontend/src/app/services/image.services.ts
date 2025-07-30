import axios from "@/app/utils/configAxios";
import { IImage, ApiResponse, IImageUploadPayload } from "@/types/index";

const getAllImage = async (): Promise<ApiResponse<IImage[]>> => {
  try {
    const data = await axios.get<ApiResponse<IImage[]>>(
      "/images/get-all-images"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createImage = async (formData: FormData) => {
  try {
    const response = await axios.post("/images/create-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API tạo ảnh:", error);
    throw error;
  }
};

const updateImage = async (
  image_id: string,
  data: IImageUploadPayload
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("title", data.titles[0]);
    formData.append("categories_id", data.categories_id);

    if (data.files[0]) {
      formData.append("url", data.files[0]);
    }

    const response = await axios.put(
      `/images/update-image/${image_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteImage = async (image_id: string): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`/images/delete-image/${image_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getImagesBySlug = async (
  slug_url: string
): Promise<ApiResponse<IImage[]>> => {
  try {
    const data = await axios.get<ApiResponse<IImage[]>>(
      `/images/get-url-images/${slug_url}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getAllImage,
  createImage,
  updateImage,
  deleteImage,
  getImagesBySlug,
};
