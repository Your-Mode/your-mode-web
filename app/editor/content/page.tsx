"use client"

import { useState } from "react"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Badge } from "@/src/shared/components/ui/badge"
import { Card, CardContent } from "@/src/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  max-width: 400px;
`

const SearchInput = styled(Input)`
  padding-right: 2.5rem;
`

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ContentCard = styled(Card)`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`

const ContentImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  background-image: url('/placeholder.svg?height=200&width=350');
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
`

const ContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;
`

const ContentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ContentExcerpt = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ContentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const StatusBadge = styled(Badge)<{ status: "published" | "draft" | "featured" }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "published":
        return "#10b981"
      case "draft":
        return "#f59e0b"
      case "featured":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }};
`

export default function AdminContentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // 샘플 데이터
  const contents = [
    {
      id: "1",
      title: "웨이브 체형을 위한 여름 스타일링 가이드",
      excerpt:
        "웨이브 체형의 특징을 살린 여름 코디 방법을 자세히 알아보세요. 부드러운 라인과 여성스러운 실루엣을 강조하는 스타일링 팁을 제공합니다.",
      bodyType: "웨이브",
      category: "스타일링 가이드",
      status: "published" as const,
      views: 1240,
      likes: 89,
      comments: 23,
      createdAt: "2025년 06월 15일",
      author: "김에디터",
      tags: ["여름", "웨이브", "스타일링"],
    },
    {
      id: "2",
      title: "2025 가을 트렌드 분석: 레이어드 룩의 귀환",
      excerpt:
        "올 가을 주목해야 할 레이어드 스타일링 트렌드를 분석합니다. 다양한 아이템을 활용한 레이어링 기법을 소개합니다.",
      bodyType: "모든 체형",
      category: "트렌드 분석",
      status: "featured" as const,
      views: 2150,
      likes: 156,
      comments: 45,
      createdAt: "2025년 06월 14일",
      author: "박스타일",
      tags: ["가을", "트렌드", "레이어드"],
    },
    {
      id: "3",
      title: "스트레이트 체형의 오피스 룩 완성하기",
      excerpt:
        "직장에서 입기 좋은 스트레이트 체형 맞춤 오피스 룩을 제안합니다. 전문적이면서도 세련된 스타일을 연출해보세요.",
      bodyType: "스트레이트",
      category: "스타일링 가이드",
      status: "draft" as const,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: "2025년 06월 13일",
      author: "이패션",
      tags: ["오피스룩", "스트레이트", "직장"],
    },
    {
      id: "4",
      title: "내추럴 체형을 위한 캐주얼 스타일링",
      excerpt:
        "편안하면서도 스타일리시한 내추럴 체형 맞춤 캐주얼 룩을 소개합니다. 자연스러운 실루엣을 살리는 방법을 알아보세요.",
      bodyType: "내추럴",
      category: "스타일링 가이드",
      status: "published" as const,
      views: 890,
      likes: 67,
      comments: 18,
      createdAt: "2025년 06월 12일",
      author: "최스타일",
      tags: ["캐주얼", "내추럴", "데일리"],
    },
  ]

  const filteredContents = contents.filter((content) => {
    const matchesSearch = searchQuery
      ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesTab = activeTab === "all" ? true : content.status === activeTab

    return matchesSearch && matchesTab
  })

  const getStatusText = (status: "published" | "draft" | "featured") => {
    switch (status) {
      case "published":
        return "발행됨"
      case "draft":
        return "임시저장"
      case "featured":
        return "추천"
      default:
        return "알 수 없음"
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("정말로 이 컨텐츠를 삭제하시겠습니까?")) {
      console.log("Delete content:", id)
      // 삭제 로직 구현
    }
  }

  return (
    <MainContainer>
      <MainContent>
        <PageHeader>
          <div>
            <PageTitle>컨텐츠 관리</PageTitle>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>에디터 컨텐츠를 작성하고 관리할 수 있습니다.</p>
          </div>
          <Link href="/editor/content/create">
            <Button>
              <Plus size={16} style={{ marginRight: "0.5rem" }} />새 컨텐츠 작성
            </Button>
          </Link>
        </PageHeader>

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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="published">발행됨</TabsTrigger>
            <TabsTrigger value="draft">임시저장</TabsTrigger>
            <TabsTrigger value="featured">추천</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <ContentGrid>
              {filteredContents.map((content) => (
                <ContentCard key={content.id}>
                  <ContentImage />
                  <CardContent className="p-4">
                    <ContentMeta>
                      <span>{content.createdAt}</span>
                      <StatusBadge status={content.status}>{getStatusText(content.status)}</StatusBadge>
                    </ContentMeta>

                    <ContentTitle>{content.title}</ContentTitle>
                    <ContentExcerpt>{content.excerpt}</ContentExcerpt>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline">{content.bodyType}</Badge>
                      <Badge variant="outline">{content.category}</Badge>
                      {content.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <StatsContainer>
                      <StatItem>
                        <Eye size={14} />
                        <span>{content.views}</span>
                      </StatItem>
                      <StatItem>
                        <span>👍 {content.likes}</span>
                      </StatItem>
                      <StatItem>
                        <span>💬 {content.comments}</span>
                      </StatItem>
                    </StatsContainer>

                    <div className="text-xs text-gray-500 mb-3">작성자: {content.author}</div>

                    <ContentActions>
                      <Link href={`/content/${content.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye size={14} style={{ marginRight: "0.25rem" }} />
                          보기
                        </Button>
                      </Link>
                      <Link href={`/editor/content/edit/${content.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit size={14} style={{ marginRight: "0.25rem" }} />
                          편집
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(content.id)}>
                        <Trash2 size={14} style={{ marginRight: "0.25rem" }} />
                        삭제
                      </Button>
                    </ContentActions>
                  </CardContent>
                </ContentCard>
              ))}
            </ContentGrid>

            {filteredContents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">검색 결과가 없습니다.</p>
                <Link href="/editor/content/create">
                  <Button>
                    <Plus size={16} style={{ marginRight: "0.5rem" }} />첫 번째 컨텐츠 작성하기
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </MainContent>
    </MainContainer>
  )
}
