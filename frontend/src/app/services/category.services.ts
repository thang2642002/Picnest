import axios from "@/app/utils/configAxios";
import { ICategory, ApiResponse, CategoryPayload } from "@/types/index";

const getAllCategory = async (): Promise<ApiResponse<ICategory[]>> => {
  try {
    const data = await axios.get<ApiResponse<ICategory[]>>(
      "/categories/get-all-categories"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createCategory = async (data: CategoryPayload): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/categories/create-categories", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateCategory = async (
  categories_id: string,
  data: CategoryPayload
): Promise<ApiResponse> => {
  try {
    const response = await axios.put(
      `/categories/update-categories/${categories_id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCategory = async (categories_id: string): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(
      `/categories/delete-categories/${categories_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
