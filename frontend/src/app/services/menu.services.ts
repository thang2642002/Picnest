import axios from "@/app/utils/configAxios";
import { IMenu, ApiResponse } from "@/types/index";

const getAllMenu = async (): Promise<ApiResponse<IMenu[]>> => {
  try {
    const response = await axios.get<ApiResponse<IMenu[]>>(
      "/menus/get-all-menu"
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API menu:", error);
    throw error;
  }
};

export default { getAllMenu };
