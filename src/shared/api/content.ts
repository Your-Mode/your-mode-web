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
  };
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

interface MyContentListResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Article[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

interface Article {
  id: number;
  title: string;
  mainImgUrl: string;
  publishAt: string;   // ISO date string
  createdAt: string;   // ISO date string
  editedAt: string;    // ISO date string
  categories: Category[];
  bodyTypes: BodyType[];
  likeCount: number;
  commentCount: number;
  viewCount: number;
  recommended: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface BodyType {
  id: number;
  name: string;
}

interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: SortInfo;
  pageSize: number;
  paged: boolean;
  pageNumber: number;
  unpaged: boolean;
}

interface PageableQuery {
  page: number;
  size: number;
  sort: string[];
}

export const getMyContentList = async (pageableQuery: PageableQuery, url?: string) => {
  const newUrl = url ? '/contents/my' + url : '/contents/my';
  const response = await axiosInstance.get<MyContentListResponse>(newUrl, {
    params: {
      page: pageableQuery.page,
      size: pageableQuery.size,
      sort: pageableQuery.sort.join(','),
    }
  });
  return response.data;
};
