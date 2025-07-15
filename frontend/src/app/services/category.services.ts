import axios from "@/app/utils/configAxios";
import { ICategory, ApiResponse } from "@/types/index";

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

export default { getAllCategory };
