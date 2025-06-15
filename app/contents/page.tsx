"use client"

import { useState, useEffect } from "react"
import ContentCard from "@/src/widgets/content/ui/content-card-vertical"
import { Input } from "@/src/shared/components/ui/input"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import styled from "@emotion/styled"

const MainContainer = styled.div`
min-height: 100vh;
background-color: ${({ theme }) => theme.colors.background.secondary};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
`

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size.base};
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
gap: 1rem;

@media (max-width: 640px) {
  justify-content: space-between;
  align-items: center;
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

@media (max-width: 640px) {
  flex: 1;
}
`

const Tab = styled.button<{ active: boolean }>`
padding: 0.75rem 1.5rem;
font-size: ${({ theme }) => theme.fonts.size.base};
font-weight: ${({ theme }) => theme.fonts.weight.semibold};
color: ${({ active, theme }) => (active ? theme.colors.primary[500] : theme.colors.text.secondary)};
background: none;
border: none;
border-bottom: 2px solid ${({ active, theme }) => (active ? theme.colors.primary[500] : "transparent")};
cursor: pointer;
transition: all 0.2s ease;
white-space: nowrap;

&:hover {
  color: ${({ theme }) => theme.colors.primary[500]};
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

@media (max-width: 640px) {
  padding: 0.4rem 0.8rem;
  font-size: ${({ theme }) => theme.fonts.size.xs};
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

@media (max-width: 640px) {
  width: 160px;
}
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`

const NoContentMessage = styled.div`
text-align: center;
padding: 3rem 0;
color: ${({ theme }) => theme.colors.text.secondary};
font-size: ${({ theme }) => theme.fonts.size.lg};
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

type BodyType = "all" | "웨이브" | "내추럴" | "스트레이트"
type SortType = "recommend" | "yourmode" | "latest" | "likes" | "comments"

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

export default function ContentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<BodyType>("all")
  const [sortType, setSortType] = useState<SortType>("recommend")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const allContent: ContentItem[] = [
    {
      id: "1",
      title: "컨텐츠 제목이 들어갈 자리라고 해야할까요?",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 124,
      comments: 23,
      date: "2025년 06월 16일",
      createdAt: new Date("2025-06-16"),
    },
    {
      id: "2",
      title: "스타일링 가이드: 내추럴 체형을 위한 룩북",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 89,
      comments: 15,
      date: "2025년 06월 15일",
      createdAt: new Date("2025-06-15"),
    },
    {
      id: "3",
      title: "스트레이트 체형 완벽 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 156,
      comments: 32,
      date: "2025년 06월 14일",
      createdAt: new Date("2025-06-14"),
    },
    {
      id: "4",
      title: "전문 에디터의 스타일링 노하우",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 200,
      comments: 45,
      date: "2025년 06월 13일",
      createdAt: new Date("2025-06-13"),
    },
    {
      id: "5",
      title: "트렌드 분석: 2025 봄 패션",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 178,
      comments: 38,
      date: "2025년 06월 12일",
      createdAt: new Date("2025-06-12"),
    },
    {
      id: "6",
      title: "나만을 위한 맞춤 스타일링",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 67,
      comments: 12,
      date: "2025년 06월 11일",
      createdAt: new Date("2025-06-11"),
    },
    {
      id: "7",
      title: "웨이브 체형을 위한 여름 코디",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 142,
      comments: 28,
      date: "2025년 06월 10일",
      createdAt: new Date("2025-06-10"),
    },
    {
      id: "8",
      title: "내추럴 체형의 오피스 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 112,
      comments: 19,
      date: "2025년 06월 09일",
      createdAt: new Date("2025-06-09"),
    },
    {
      id: "9",
      title: "스트레이트 체형을 위한 데일리 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 98,
      comments: 21,
      date: "2025년 06월 08일",
      createdAt: new Date("2025-06-08"),
    },
    {
      id: "10",
      title: "여름 휴가를 위한 리조트 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 165,
      comments: 33,
      date: "2025년 06월 07일",
      createdAt: new Date("2025-06-07"),
    },
    {
      id: "11",
      title: "가을 시즌 트렌드 컬러 활용법",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 132,
      comments: 27,
      date: "2025년 06월 06일",
      createdAt: new Date("2025-06-06"),
    },
    {
      id: "12",
      title: "겨울 아우터 스타일링 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 187,
      comments: 41,
      date: "2025년 06월 05일",
      createdAt: new Date("2025-06-05"),
    },
  ]

  // 검색어와 탭 필터링을 모두 적용
  let filteredContent = allContent.filter((content) => {
    // 검색어 필터링
    const matchesSearch = searchQuery ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) : true

    // 탭 필터링
    const matchesTab = activeTab === "all" ? true : content.bodyType === activeTab

    return matchesSearch && matchesTab
  })

  // 정렬 적용
  filteredContent = [...filteredContent].sort((a, b) => {
    switch (sortType) {
      case "yourmode":
        // 유어모드 추천순 (임의로 ID 기준으로 정렬)
        return Number.parseInt(a.id) - Number.parseInt(b.id)
      case "latest":
        // 최신순
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "likes":
        // 좋아요순
        return b.likes - a.likes
      case "comments":
        // 댓글순
        return b.comments - a.comments
      case "recommend":
      default:
        // 추천순 (기본값, 임의로 좋아요와 댓글 수의 합으로 정렬)
        return b.likes + b.comments - (a.likes + a.comments)
    }
  })

  const tabs: { id: BodyType; label: string }[] = [
    { id: "all", label: "전체" },
    { id: "웨이브", label: "웨이브" },
    { id: "스트레이트", label: "스트레이트" },
    { id: "내추럴", label: "내추럴" },
  ]

  const sortOptions: { id: SortType; label: string }[] = [
    { id: "recommend", label: "추천순" },
    { id: "yourmode", label: "유어모드 추천순" },
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

  // 드롭다운 외부 클릭 시 닫기
  const handleClickOutside = () => {
    if (isSortOpen) {
      setIsSortOpen(false)
    }
  }

  return (
    <MainContainer onClick={handleClickOutside}>
      <MainContent>
        <PageTitle>콘텐츠 둘러보기</PageTitle>
        <PageDescription>
          사용자들이 신청하여 업로드에 동의한 스타일링 콘텐츠들을 만나보세요. 다양한 체형별 맞춤 스타일링 팁과 노하우를
          확인할 수 있습니다.
        </PageDescription>

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

        {/* Filters */}
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

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <ContentGrid>
            {filteredContent.map((content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                title={content.title}
                image={content.image}
                bodyType={content.bodyType}
                likes={content.likes}
                comments={content.comments}
                date={content.date}
              />
            ))}
          </ContentGrid>
        ) : (
          <NoContentMessage>검색 결과가 없습니다. 다른 검색어나 필터를 시도해보세요.</NoContentMessage>
        )}
        {/* Floating Scroll to Top Button */}
        <FloatingButton visible={showScrollTop} onClick={scrollToTop}>
          <ChevronUp size={20} />
        </FloatingButton>
      </MainContent>
    </MainContainer>
  )
}
