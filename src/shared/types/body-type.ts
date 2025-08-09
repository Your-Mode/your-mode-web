export interface Question {
  id: number;
  question: string;
  options: {
    text: string
    type: "natural" | "wave" | "straight"
    image?: string
  }[];
}

export interface BodyAnalysisResult {
  id: string;
  type: "natural" | "straight" | "wave";
  analysisDate: string;
  title: string;
  description: string;
  gradient: string;
}

export interface ChatMessage {
  type: "bot" | "user" | "system";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  answer: string;
  question: string;
}

export interface ChatResponse {
  isSuccess: boolean;
  selected: string;
  message: string;
  nextQuestion: string;
}

export interface BodyResultRequest {
  answers: string[];
  gender: string;
  height: number;
  weight: number;
}

export interface BodyResultResponse {
  body_type: string;
  type_description: string;
  detailed_features: string;
  attraction_points: string;
  recommended_styles: string;
  avoid_styles: string;
  styling_fixes: string;
  styling_tips: string;
}
