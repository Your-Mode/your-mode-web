import { axiosInstance } from "@/src/shared/api/axiosInstance";
import { MyProfileResponse } from "@/src/shared/types/user";

export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get<BaseResponse<MyProfileResponse>>('/users/me');
    console.log(response.data);
    return response.data;
  } catch ( error ) {
    console.error(error);
  }
};
