import axios from "@/app/utils/configAxios";
import { IMenu, MenuPayload, ApiResponse } from "@/types/index";

const getAllMenu = async (): Promise<ApiResponse<IMenu[]>> => {
  try {
    const response = await axios.get<ApiResponse<IMenu[]>>(
      "/menus/get-all-menu"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API menu:", error);
    throw error;
  }
};

const createMenu = async (data: MenuPayload): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/menus/create-menu", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo menu:", error);
    throw error;
  }
};

const updateMenu = async (
  menuId: string,
  data: MenuPayload
): Promise<ApiResponse> => {
  try {
    const response = await axios.put(`/menus/update-menu/${menuId}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo menu:", error);
    throw error;
  }
};

const deleteMenu = async (menu_id: string): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`/menus/delete-menu/${menu_id}`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo menu:", error);
    throw error;
  }
};

export default { getAllMenu, createMenu, updateMenu, deleteMenu };
