import SortTab from "@/src/widgets/contents/ui/SortTab";
import SortDropdown from "@/src/widgets/contents/ui/SortDropdown";
import styled from "@emotion/styled";
import { sortOptions } from "@/src/shared/types/contents";
import { BodyType, SortType } from "@/src/shared/types/content";

interface ContentFilterProps {
  sortType: SortType;
  isSortOpen: boolean;
  activeTab: BodyType;
  changeTab: (tabId: BodyType) => void;
  handleSortClick: () => void;
  handleSortOptionClick: (sortType: SortType) => void;
}

const ContentFilter = ({ sortType, isSortOpen, handleSortClick, handleSortOptionClick, changeTab, activeTab }: ContentFilterProps) => {
  const currentSortOption = sortOptions.find((option) => option.id === sortType);

  return (
    <FilterContainer>
      {/* Tabs */}
      <SortTab activeTab={activeTab} changeTab={changeTab} />
      <SortDropdown
        sortType={sortType}
        isSortOpen={isSortOpen}
        currentSortOption={currentSortOption}
        handleSortClick={handleSortClick}
        handleSortOptionClick={handleSortOptionClick}
      />
    </FilterContainer>
  );
};

export default ContentFilter;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 640px) {
    justify-content: space-between;
    align-items: center;
  }
`;
