import axios from "axios";
import { useAuthStore } from "@/src/shared/store/auth";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) return config;
  (config.headers as Record<string, any>).Authorization = `Bearer ${accessToken}`;
  return config;
});

const MAX_RETRY_COUNT = 2;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (originalRequest._retryCount === undefined) {
      originalRequest._retryCount = 0;
    }

    if ((error.response.status === 401 || error.response.status === 403) && originalRequest._retryCount < MAX_RETRY_COUNT) {
      originalRequest._retryCount++;
      try {
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch ( refreshError ) {
        useAuthStore.getState().logout();
      }
    }
    throw error;
  },
);
