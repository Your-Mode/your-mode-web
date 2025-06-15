export interface Question {
  id: number
  question: string
  options: {
    text: string
    type: "natural" | "wave" | "straight"
    image?: string
  }[]
}

export interface BodyAnalysisResult {
  id: string;
  type: "natural" | "straight" | "wave";
  analysisDate: string;
  title: string;
  description: string;
  gradient: string;
}
