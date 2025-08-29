import { axiosInstance } from "@/src/shared/api/axiosInstance";
import { MyProfileResponse } from "@/src/shared/types/user";
import axios from "axios";

export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get<BaseResponse<MyProfileResponse>>('/users/me');
    console.log(response.data);
    return response.data;
  } catch ( error ) {
    console.error(error);
  }
};

export interface UpdateMyProfileRequest {
  name: string;
  phoneNumber: string;
  height: number;
  weight: number;
  gender: string;
  bodyTypeId: number;
}

export const updateMyProfile = async (data: UpdateMyProfileRequest) => {
  try {
    const response = await axiosInstance.put('/users/me', data);
    return response.data;
  } catch ( error ) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export interface UpdatePasswordRequest {
  newPassword: string;
}

export const updatePassword = async (request: UpdatePasswordRequest) => {
  try {
    const response = await axiosInstance.post<BaseResponse<string>>('/users/me/password', request);
    return response.data;
  } catch ( error ) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
