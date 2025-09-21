import { BodyResultResponse, ChatRequest, ChatResponse } from "@/src/shared/types/body-type";
import axios from "axios";
import { axiosInstance } from "@/src/shared/api/axiosInstance";

export const chat = async (req: ChatRequest): Promise<ChatResponse> => {
  try {
    const res = await axios.post<ChatResponse>("https://fast.yourmode.co.kr/assistant/chat", req, {
      timeout: 50000,
    });
    return res.data;
  } catch ( error ) {
    console.error(error, "Failed to fetch chat response");
    throw error;
  }
};

export interface AnalysisRequest {
  answers: string[];
  gender: string;
  height: number;
  weight: number;
}

export const postBodyAnalysis = async (req: AnalysisRequest) => {
  try {
    const res = await axiosInstance.post<BaseResponse<BodyResultResponse>>('/surveys/analysis', req, {
      timeout: 280000,
    });
    console.log(res.data);
    return res.data.result;
  } catch ( error ) {
    console.error(error);
    throw error;
  }
};
