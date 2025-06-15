import { ChangeEvent, useState } from "react";
import { allContent } from "@/src/shared/api/mock";

export const useHandleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterContent = (activeTab: string, sortType: string) => {
    let result = allContent.filter((content) => {
      // 검색어 필터링
      const matchesSearch = searchQuery ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;

      // 탭 필터링
      const matchesTab = activeTab === "all" ? true : content.bodyType === activeTab;

      return matchesSearch && matchesTab;
    });

    result = [...result].sort((a, b) => {
      switch (sortType) {
        case "yourmode":
          // 유어모드 추천순 (임의로 ID 기준으로 정렬)
          return Number.parseInt(a.id) - Number.parseInt(b.id);
        case "latest":
          // 최신순
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "likes":
          // 좋아요순
          return b.likes - a.likes;
        case "comments":
          // 댓글순
          return b.comments - a.comments;
        case "recommend":
        default:
          // 추천순 (기본값, 임의로 좋아요와 댓글 수의 합으로 정렬)
          return b.likes + b.comments - (a.likes + a.comments);
      }
    });
    return result;
  };

  return { searchQuery, onChangeSearch, filterContent };
};
