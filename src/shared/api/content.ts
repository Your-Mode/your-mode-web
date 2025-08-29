import { axiosInstance } from "@/src/shared/api/axiosInstance";
import axios from "axios";

export interface ContentCreateRequest {
  bodyFeature: string;
  situation: string;
  recommendedStyle: string;
  avoidedStyle: string;
  budget: number;
  isPublic: boolean;
  itemCategoryIds: number[];
}

export const createContentRequest = async (request: ContentCreateRequest) => {
  try {
    const response = await axiosInstance.post('/content-requests', request);
    return response.data;
  } catch ( error ) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export interface StatusHistory {
  statusName: string;
  changedAt: string;
  editorId: string | null;
  editorName: string | null;
}

export interface ContentRequestItem {
  id: number;
  bodyFeature: string;
  situation: string;
  recommendedStyle: string;
  avoidedStyle: string;
  budget: number;
  isPublic: boolean;
  statusHistories: StatusHistory[];
  createdAt: string;
}

export const getContentRequestsList = async () => {
  try {
    const response = await axiosInstance.get<BaseResponse<ContentRequestItem[]>>('/content-requests/me');
    return response.data;
  } catch ( error ) {
    console.error(error);
  }
};

export interface ContentRequestDetailResponse {
  id: number;
  bodyFeature: string;
  situation: string;
  recommendedStyle: string;
  avoidedStyle: string;
  budget: number;
  isPublic: boolean;
  profile: {
    name: string;
    height: number;
    weight: number;
    bodyTypeName: string;
  }
  statusHistories: StatusHistory[];
  itemCategoryIds: number[];
  itemCategoryNames: string[];
  createdAt: string;
}

export const getContentRequestDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get<BaseResponse<ContentRequestDetailResponse>>(`/content-requests/me/${id}`);
    return response.data.result;
  } catch ( error ) {
    console.error(error);
  }
};
