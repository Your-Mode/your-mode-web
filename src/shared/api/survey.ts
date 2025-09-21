import { axiosInstance } from "@/src/shared/api/axiosInstance";


export interface MySurveyResult {
  resultId: number;
  bodyTypeName: string;
  historyId: number;
  createdAt: string;
}

export const getMySurveyResults = async () => {
  const response = await axiosInstance.get<BaseResponse<MySurveyResult[]>>('/surveys/results/me');
  return response.data;
};

export interface MySurveyResultDetailResponse {
  resultId: number;
  bodyTypeName: string;
  typeDescription: string;
  detailedFeatures: string;
  attractionPoints: string;
  recommendedStyles: string;
  avoidStyles: string;
  stylingFixes: string;
  stylingTips: string;
  historyId: number;
  createdAt: string;
}

export const getMySurveyResultDetail = async (resultId: number) => {
  const response = await axiosInstance.get<BaseResponse<MySurveyResultDetailResponse>>(`/surveys/results/${resultId}`);
  return response.data;
}
