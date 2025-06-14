"use client"

import ContentCard from "@/src/widgets/content/ui/content-card-vertical"
import styled from "@emotion/styled"
import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const PageHeader = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  }
`

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  max-width: 800px;
  
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }
`

const SectionContainer = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
  
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const LoadMoreButton = styled.button`
  padding: 0.875rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.base};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.primary[300]};
  }
`

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
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    gap: 1rem;
  }
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;
  
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
    padding: 0.75rem 0.5rem;
    font-size: 0.75rem;
  }
`

const SortDropdownContainer = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`

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
`

const SortDropdown = styled.div<{ isOpen: boolean }>`
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
`

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
`

const FloatingButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 640px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`

type SortType = "recommend" | "latest" | "likes" | "comments"

interface ContentItem {
  id: string
  title: string
  image: string
  bodyType: string
  likes: number
  comments: number
  date: string
  createdAt: Date
}

export default function EditorContentsPage() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortType, setSortType] = useState<SortType>("recommend")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showScrollTop, setShowScrollTop] = useState(false)

  const allContent: ContentItem[] = [
    {
      id: "1",
      title: "전문 에디터의 스타일링 노하우",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 200,
      comments: 45,
      date: "2025년 06월 16일",
      createdAt: new Date("2025-06-16"),
    },
    {
      id: "2",
      title: "트렌드 분석: 2025 봄 패션",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 178,
      comments: 38,
      date: "2025년 06월 15일",
      createdAt: new Date("2025-06-15"),
    },
    {
      id: "3",
      title: "스트레이트 체형을 위한 데일리 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 156,
      comments: 32,
      date: "2025년 06월 14일",
      createdAt: new Date("2025-06-14"),
    },
    {
      id: "4",
      title: "2025 S/S 컬러 트렌드 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 142,
      comments: 28,
      date: "2025년 06월 13일",
      createdAt: new Date("2025-06-13"),
    },
    {
      id: "5",
      title: "미니멀리즘의 귀환: 심플한 스타일링",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 112,
      comments: 19,
      date: "2025년 06월 12일",
      createdAt: new Date("2025-06-12"),
    },
    {
      id: "6",
      title: "오버사이즈 코트의 계절별 활용법",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 98,
      comments: 21,
      date: "2025년 06월 11일",
      createdAt: new Date("2025-06-11"),
    },
    {
      id: "7",
      title: "웨이브 체형을 위한 액세서리 매칭",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 87,
      comments: 16,
      date: "2025년 06월 10일",
      createdAt: new Date("2025-06-10"),
    },
    {
      id: "8",
      title: "내추럴 체형의 캐주얼 스타일링",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 76,
      comments: 14,
      date: "2025년 06월 09일",
      createdAt: new Date("2025-06-09"),
    },
    {
      id: "9",
      title: "스트레이트 체형을 위한 포멀 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 65,
      comments: 12,
      date: "2025년 06월 08일",
      createdAt: new Date("2025-06-08"),
    },
    {
      id: "10",
      title: "여름 휴가를 위한 비치 스타일링",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 58,
      comments: 9,
      date: "2025년 06월 07일",
      createdAt: new Date("2025-06-07"),
    },
    {
      id: "11",
      title: "직장인을 위한 스마트 캐주얼",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 52,
      comments: 8,
      date: "2025년 06월 06일",
      createdAt: new Date("2025-06-06"),
    },
    {
      id: "12",
      title: "가을 트렌치코트 스타일링 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 47,
      comments: 6,
      date: "2025년 06월 05일",
      createdAt: new Date("2025-06-05"),
    },
  ]

  const tabs = [
    { id: "all", label: "전체" },
    { id: "wave", label: "웨이브" },
    { id: "straight", label: "스트레이트" },
    { id: "natural", label: "내추럴" },
  ]

  // 검색어 필터링
  let filteredContent = allContent.filter((content) => content.title.toLowerCase().includes(searchQuery.toLowerCase()))

  // 카테고리 필터링 추가
  if (activeTab !== "all") {
    const tabToBodyType: { [key: string]: string } = {
      wave: "웨이브",
      straight: "스트레이트",
      natural: "내추럴",
    }
    filteredContent = filteredContent.filter((content) => content.bodyType === tabToBodyType[activeTab])
  }

  // 정렬 적용
  filteredContent = [...filteredContent].sort((a, b) => {
    switch (sortType) {
      case "latest":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "likes":
        return b.likes - a.likes
      case "comments":
        return b.comments - a.comments
      case "recommend":
      default:
        return b.likes + b.comments - (a.likes + a.comments)
    }
  })

  const visibleContent = filteredContent.slice(0, visibleCount)
  const hasMoreContent = visibleCount < filteredContent.length

  const sortOptions: { id: SortType; label: string }[] = [
    { id: "recommend", label: "추천순" },
    { id: "latest", label: "최신순" },
    { id: "likes", label: "좋아요순" },
    { id: "comments", label: "댓글순" },
  ]

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentSortOption = sortOptions.find((option) => option.id === sortType)

  const handleSortClick = () => {
    setIsSortOpen(!isSortOpen)
  }

  const handleSortOptionClick = (sortType: SortType) => {
    setSortType(sortType)
    setIsSortOpen(false)
  }

  const loadMoreContent = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredContent.length))
  }

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = () => {
    if (isSortOpen) {
      setIsSortOpen(false)
    }
  }

  return (
    <>
      <MainContainer onClick={handleClickOutside}>
        <MainContent>
          <PageHeader>
            <PageTitle>에디터 컨텐츠</PageTitle>
            <PageDescription>
              전문 패션 에디터들이 제안하는 스타일링 팁과 트렌드 분석을 만나보세요. 체형별 맞춤 스타일링 가이드와 시즌별
              트렌드를 확인할 수 있습니다.
            </PageDescription>
          </PageHeader>

          {/* Search */}
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="제목, 내용으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
          </SearchContainer>

          {/* Filter */}
          <FilterContainer>
            {/* Tabs */}
            <TabsContainer>
              {tabs.map((tab) => (
                <Tab key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
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

          <SectionContainer>
            <SectionTitle>에디터 컨텐츠</SectionTitle>
            <ContentGrid>
              {visibleContent.map((content) => (
                <ContentCard key={content.id} {...content} />
              ))}
            </ContentGrid>
            {filteredContent.length === 0 && searchQuery && (
              <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>검색 결과가 없습니다.</div>
            )}
            {hasMoreContent && (
              <LoadMoreContainer>
                <LoadMoreButton onClick={loadMoreContent}>더 보기</LoadMoreButton>
              </LoadMoreContainer>
            )}
          </SectionContainer>
        </MainContent>
      </MainContainer>
      {/* Floating Scroll to Top Button */}
      <FloatingButton visible={showScrollTop} onClick={scrollToTop}>
        <ChevronUp size={20} />
      </FloatingButton>
    </>
  )
}
