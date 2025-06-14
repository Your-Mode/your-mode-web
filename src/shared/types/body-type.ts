export interface Question {
  id: number
  question: string
  options: {
    text: string
    type: "natural" | "wave" | "straight"
    image?: string
  }[]
}
