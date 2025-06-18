import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { myCustomContents } from "@/src/shared/api/mock";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";

const tabCounts = {
  all: myCustomContents.length,
  pending: myCustomContents.filter((c) => c.status === "pending").length,
  "in-progress": myCustomContents.filter((c) => c.status === "in-progress" || c.status === "assigned").length,
  completed: myCustomContents.filter((c) => c.status === "completed").length,
};

interface ProgressFilterProps {
  activeCustomTab: string;
  setActiveCustomTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProgressFilter = ({ activeCustomTab, setActiveCustomTab, setSearchQuery, searchQuery }: ProgressFilterProps) => {
  return (
    <FilterSection>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="제목이나 내용으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
      </SearchContainer>

      <Tabs value={activeCustomTab} onValueChange={setActiveCustomTab}>
        <FilterTabs>
          <TabsTrigger value="all">전체 ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">대기 중 ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="in-progress">진행 중 ({tabCounts["in-progress"]})</TabsTrigger>
          <TabsTrigger value="completed">완료 ({tabCounts.completed})</TabsTrigger>
        </FilterTabs>
      </Tabs>
    </FilterSection>
  );
};

export default ProgressFilter;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled(Input)`
  padding-right: 2.5rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const FilterTabs = styled(TabsList)`
  background-color: white;
  border: 1px solid #e5e7eb;
`;
