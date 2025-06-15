export type BodyType = "all" | "웨이브" | "내추럴" | "스트레이트"
export type SortType = "recommend" | "yourmode" | "latest" | "likes" | "comments"

export interface ContentItem {
  id: string;
  title: string;
  image: string;
  bodyType: string;
  likes: number;
  comments: number;
  date: string;
  createdAt: Date;
}

export type ContentStatus = "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"

export interface MyContentItem {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  progress: number;
  applicationDate: string;
  expectedDate?: string;
  editorName?: string;
  items: string[];
  timeline: {
    step: string
    completed: boolean
    date?: string
  }[];
}
