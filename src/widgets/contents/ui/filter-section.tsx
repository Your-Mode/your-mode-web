"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import styled from "@emotion/styled"

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.active ? "#ff3e6c" : "#666")};
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#ff3e6c" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    color: #ff3e6c;
  }
  
  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
`

const SortDropdownContainer = styled.div`
  position: relative;
  z-index: 10;
`

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #ddd;
    background-color: #f9f9f9;
  }
`

const SortDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 180px;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 20;
`

const SortOption = styled.button<{ active: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${(props) => (props.active ? "#ff3e6c" : "#333")};
  background-color: ${(props) => (props.active ? "#fff5f7" : "transparent")};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f9f9f9;
    color: #ff3e6c;
  }
`

interface Tab {
  id: string
  label: string
}

interface SortOption {
  id: string
  label: string
}

interface FilterSectionProps {
  tabs: Tab[]
  sortOptions: SortOption[]
  activeTab: string
  sortType: string
  onTabChange: (tabId: string) => void
  onSortChange: (sortId: string) => void
}

export default function FilterSection({
  tabs,
  sortOptions,
  activeTab,
  sortType,
  onTabChange,
  onSortChange,
}: FilterSectionProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)

  const currentSortOption = sortOptions.find((option) => option.id === sortType)

  const handleSortClick = () => {
    setIsSortOpen(!isSortOpen)
  }

  const handleSortOptionClick = (sortId: string) => {
    onSortChange(sortId)
    setIsSortOpen(false)
  }

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = () => {
    if (isSortOpen) {
      setIsSortOpen(false)
    }
  }

  return (
    <FilterContainer onClick={handleClickOutside}>
      {/* Tabs */}
      <TabsContainer>
        {tabs.map((tab) => (
          <Tab key={tab.id} active={activeTab === tab.id} onClick={() => onTabChange(tab.id)}>
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>

      {/* Sort Dropdown */}
      <SortDropdownContainer onClick={(e) => e.stopPropagation()}>
        <SortButton onClick={handleSortClick}>
          {currentSortOption?.label || "추천순"}
          <ChevronDown size={16} />
        </SortButton>
        <SortDropdown isOpen={isSortOpen}>
          {sortOptions.map((option) => (
            <SortOption
              key={option.id}
              active={sortType === option.id}
              onClick={() => handleSortOptionClick(option.id)}
            >
              {option.label}
            </SortOption>
          ))}
        </SortDropdown>
      </SortDropdownContainer>
    </FilterContainer>
  )
}
