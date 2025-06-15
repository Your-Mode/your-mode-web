import { BodyType, SortType } from "@/src/shared/types/content";

export const tabs: { id: BodyType; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "웨이브", label: "웨이브" },
  { id: "스트레이트", label: "스트레이트" },
  { id: "내추럴", label: "내추럴" },
];

export const sortOptions: { id: SortType; label: string }[] = [
  { id: "recommend", label: "추천순" },
  { id: "yourmode", label: "유어모드 추천순" },
  { id: "latest", label: "최신순" },
  { id: "likes", label: "좋아요순" },
  { id: "comments", label: "댓글순" },
];
