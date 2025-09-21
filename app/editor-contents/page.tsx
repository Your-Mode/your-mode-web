"use client";

import styled from "@emotion/styled";
import { editorContent } from "@/src/shared/api/mock";
import FloatingButton from "@/src/widgets/contents/ui/FloatingButton";
import Searchbar from "@/src/widgets/contents/ui/Searchbar";
import { useHandleSearch } from "@/src/widgets/contents/feature/useHandleSearch";
import { useHandleTab } from "@/src/widgets/contents/feature/useHandleTab";
import { useHandleDropdown } from "@/src/widgets/contents/feature/useHandleDropdown";
import ContentFilter from "@/src/widgets/contents/ui/ContentFilter";
import ContentsHeader from "@/src/widgets/contents/ui/ContentsHeader";
import ContentsList from "@/src/widgets/contents/ui/ContentsList";
import { useGetEditorContentList } from "@/src/widgets/contents/feature/useGetEditorContentList";

export default function EditorContentsPage() {
  const { searchQuery, onChangeSearch, filterContent } = useHandleSearch();
  const { activeTab, changeTab } = useHandleTab();
  const { sortType, isSortOpen, handleSortClick, handleClickOutside, handleSortOptionClick } = useHandleDropdown();
  const bodyTypeIds = activeTab === "스트레이트" ? 1 : activeTab === "웨이브" ? 2 : activeTab === "내추럴" ? 3 : null;

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEditorContentList(bodyTypeIds, {
      size: 9,
      sort: [],
    });

  const items = data?.flat ?? [];

  return (
    <MainContainer onClick={handleClickOutside}>
      <MainContent>
        <ContentsHeader
          title="에디터 컨텐츠"
          description="전문 패션 에디터들이 제안하는 스타일링 팁과 트렌드 분석을 만나보세요. 체형별 맞춤 스타일링 가이드와 시즌별트렌드를 확인할 수 있습니다."
        />
        <Searchbar searchQuery={searchQuery} onChangeSearch={onChangeSearch} />
        <ContentFilter sortType={sortType} isSortOpen={isSortOpen} activeTab={activeTab} changeTab={changeTab}
                       handleSortClick={handleSortClick} handleSortOptionClick={handleSortOptionClick} />
        <ContentsList
          items={items}
          onLoadMore={() => hasNextPage && fetchNextPage()}
          isFetchingMore={isFetchingNextPage}
        />
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
