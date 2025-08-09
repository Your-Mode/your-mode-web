import { LocalSignUpRequest, LoginRequest, LoginResponse, SignUpResponse } from "@/src/shared/types/auth";
import { axiosInstance } from "@/src/shared/api/axiosInstance";
import axios from "axios";

export const signupLocal = async (signUpRequest: LocalSignUpRequest) => {
  try {
    const response = await axiosInstance.post<BaseResponse<SignUpResponse>>('/auth/signup', signUpRequest);
    return response.data;
  } catch ( error ) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const login = async (loginRequest: LoginRequest) => {
  try {
    const response = await axiosInstance.post<BaseResponse<LoginResponse>>('/auth/login', loginRequest);
    return response.data;
  } catch ( error ) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.code);
      if (error.response?.data.code === 'AUTH-401-001' || error.response?.data.code === 'AUTH-401-002' || error.response?.data.code === 'AUTH-401-005') {
        throw new Error(error.response?.data.message)
      } else {
        throw new Error("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch ( error ) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}
