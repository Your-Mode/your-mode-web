import { ChevronDown } from "lucide-react";
import { sortOptions } from "@/src/shared/types/contents";
import styled from "@emotion/styled";
import { SortType } from "@/src/shared/types/content";

interface SortDropdownProps {
  sortType: SortType;
  isSortOpen: boolean;
  currentSortOption?: { id: SortType; label: string };
  handleSortClick: () => void;
  handleSortOptionClick: (sortType: SortType) => void;
}

const SortDropdown = ({ sortType, isSortOpen, currentSortOption, handleSortOptionClick, handleSortClick }: SortDropdownProps) => {
  return (
    <SortDropdownContainer onClick={(e) => e.stopPropagation()}>
      <SortButton onClick={handleSortClick}>
        {currentSortOption?.label || "추천순"}
        <ChevronDown size={16} />
      </SortButton>
      <Dropdown isOpen={isSortOpen}>
        {sortOptions.map((option) => (
          <SortOption
            key={option.id}
            active={sortType === option.id}
            onClick={() => handleSortOptionClick(option.id)}
          >
            {option.label}
          </SortOption>
        ))}
      </Dropdown>
    </SortDropdownContainer>
  )
}

export default SortDropdown;

const SortDropdownContainer = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.8rem;
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 4px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow.medium};
  margin-top: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 2;

  @media (max-width: 640px) {
    width: 160px;
  }
`;

const SortOption = styled.button<{ active: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ active, theme }) => (active ? theme.colors.primary[500] : theme.colors.text.primary)};
  background-color: ${({ active, theme }) => (active ? theme.colors.primary[50] : "transparent")};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
