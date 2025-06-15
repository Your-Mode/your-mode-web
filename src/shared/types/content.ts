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
