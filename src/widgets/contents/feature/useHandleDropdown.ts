import { useState } from "react";
import { SortType } from "@/src/shared/types/content";

export const useHandleDropdown = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>("recommend");


  const handleSortClick = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSortOptionClick = (sortType: SortType) => {
    setSortType(sortType);
    setIsSortOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = () => {
    if (isSortOpen) {
      setIsSortOpen(false);
    }
  };

  return { sortType, isSortOpen, handleSortClick, handleClickOutside, handleSortOptionClick }
}
