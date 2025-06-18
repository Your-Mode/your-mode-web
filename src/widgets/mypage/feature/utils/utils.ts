import { ContentStatus } from "@/src/shared/types/content";

export const getStatusText = (status: ContentStatus) => {
  switch (status) {
    case "pending":
      return "접수 완료";
    case "assigned":
      return "에디터 배정";
    case "in-progress":
      return "제작 중";
    case "review":
      return "검토 중";
    case "completed":
      return "완료";
    case "cancelled":
      return "취소됨";
    default:
      return "접수 완료";
  }
};
