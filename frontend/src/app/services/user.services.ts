import axios from "@/app/utils/configAxios";
import { IUser, UserPayload, ApiResponse, UserLogin } from "@/types/index";

const getAllUser = async (): Promise<ApiResponse<IUser[]>> => {
  try {
    const data = await axios.get<ApiResponse<IUser[]>>("/users/get-all-user");
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createUser = async (data: UserPayload): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/users/create-user", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (
  userId: string,
  data: UserPayload
): Promise<ApiResponse> => {
  try {
    const response = await axios.put(`/users/update-user/${userId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async (userId: string): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`/users/update-user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse<UserLogin<IUser>>> => {
  try {
    const response = await axios.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logoutUser = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
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
