import axios from "@/app/utils/configAxios";
import { IUser, ApiResponse } from "@/types/index";

const getAllUser = async (): Promise<ApiResponse<IUser[]>> => {
  try {
    const data = await axios.get<ApiResponse<IUser[]>>("/users/get-all-user");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getAllUser };
