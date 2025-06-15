"use client";

import styled from "@emotion/styled";
import Searchbar from "@/src/widgets/contents/ui/Searchbar";
import { useHandleSearch } from "@/src/widgets/contents/feature/useHandleSearch";
import { useHandleTab } from "@/src/widgets/contents/feature/useHandleTab";
import { useHandleDropdown } from "@/src/widgets/contents/feature/useHandleDropdown";
import FloatingButton from "@/src/widgets/contents/ui/FloatingButton";
import ContentFilter from "@/src/widgets/contents/ui/ContentFilter";
import ContentsHeader from "@/src/widgets/contents/ui/ContentsHeader";
import ContentsList from "@/src/widgets/contents/ui/ContentsList";
import { allContent } from "@/src/shared/api/mock";

export default function ContentsPage() {
  const { searchQuery, onChangeSearch, filterContent } = useHandleSearch();
  const { activeTab, changeTab } = useHandleTab();
  const { sortType, isSortOpen, handleSortClick, handleClickOutside, handleSortOptionClick } = useHandleDropdown();

  const filteredContent = filterContent(allContent, activeTab, sortType);

  return (
    <MainContainer onClick={handleClickOutside}>
      <MainContent>
        <ContentsHeader
          title="콘텐츠 둘러보기"
          description="사용자들이 신청하여 업로드에 동의한 스타일링 콘텐츠들을 만나보세요. 다양한 체형별 맞춤 스타일링 팁과 노하우를 확인할 수 있습니다."
        />
        <Searchbar searchQuery={searchQuery} onChangeSearch={onChangeSearch} />
        <ContentFilter
          sortType={sortType}
          isSortOpen={isSortOpen}
          activeTab={activeTab}
          changeTab={changeTab}
          handleSortClick={handleSortClick}
          handleSortOptionClick={handleSortOptionClick}
        />
        <ContentsList filteredContent={filteredContent} />
        <FloatingButton />
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;
