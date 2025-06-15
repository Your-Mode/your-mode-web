"use client"

import { Input } from "@/src/shared/components/ui/input"
import { Search } from "lucide-react"
import styled from "@emotion/styled"

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`

const SearchInput = styled(Input)`
  padding-right: 2.5rem;
  
  &:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = "제목, 내용으로 검색" }: SearchBarProps) {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      <SearchIcon>
        <Search size={16} />
      </SearchIcon>
    </SearchContainer>
  )
}
