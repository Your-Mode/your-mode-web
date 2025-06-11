export interface Content {
  id: string
  title: string
  description?: string
  image: string
  bodyType: string
  likes: number
  comments: number
  date: string
  createdAt: Date
  editorName?: string
  items?: string[]
}

export interface ContentApplication {
  id: string
  title: string
  description: string
  status: "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"
  progress: number
  applicationDate: string
  expectedDate?: string
  editorName?: string
  items: string[]
  timeline: {
    step: string
    completed: boolean
    date?: string
  }[]
}
