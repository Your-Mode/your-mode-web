import { ChatRequest, ChatResponse } from "@/src/shared/types/body-type";
import axios from "axios";

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
