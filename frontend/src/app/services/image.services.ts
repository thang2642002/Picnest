import axios from "@/app/utils/configAxios";
import { IImage, ApiResponse } from "@/types/index";

const getAllImage = async (): Promise<ApiResponse<IImage[]>> => {
  try {
    const data = await axios.get<ApiResponse<IImage[]>>(
      "/images/get-all-image"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getAllImage };
