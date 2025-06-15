import { Search } from "lucide-react";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { ChangeEvent } from "react";

interface SearchbarProps {
  searchQuery: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar = ({ searchQuery, onChangeSearch }: SearchbarProps) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="제목, 내용으로 검색"
        value={searchQuery}
        onChange={(e) => onChangeSearch(e)}
      />
      <SearchIcon>
        <Search size={16} />
      </SearchIcon>
    </SearchContainer>
  );
};

export default Searchbar;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled(Input)`
  padding-right: 2.5rem;

  &:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
