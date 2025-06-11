"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, Eye, TrendingUp, MessageSquare, PlusCircle, BarChart3 } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const DashboardContainer = styled.div`
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
`

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const PageDescription = styled.p`
  color: #666;
  font-size: 1rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
`

const StatCard = styled(Card)`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StatIcon = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${(props) => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0.5rem 0;
`

const StatLabel = styled.div`
  color: #666;
  font-size: 0.875rem;
`

const StatChange = styled.div<{ positive: boolean }>`
  font-size: 0.75rem;
  color: ${(props) => (props.positive ? "#10b981" : "#ef4444")};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const RecentContent = styled(Card)`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`

const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

const ContentMeta = styled.div`
  font-size: 0.75rem;
  color: #666;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #333;
`

const QuickActions = styled(Card)`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`

const ActionButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export default function EditorDashboard() {
  const stats = [
    {
      title: "총 컨텐츠",
      value: "156",
      change: "+12%",
      positive: true,
      icon: FileText,
      color: "#3b82f6",
    },
    {
      title: "총 사용자",
      value: "2,847",
      change: "+8%",
      positive: true,
      icon: Users,
      color: "#10b981",
    },
    {
      title: "이번 달 조회수",
      value: "45.2K",
      change: "+23%",
      positive: true,
      icon: Eye,
      color: "#f59e0b",
    },
    {
      title: "맞춤 컨텐츠 신청",
      value: "89",
      change: "+5%",
      positive: true,
      icon: MessageSquare,
      color: "#8b5cf6",
    },
  ]

  const recentContents = [
    {
      id: "1",
      title: "웨이브 체형을 위한 여름 스타일링 가이드",
      author: "김에디터",
      status: "published",
      views: 1240,
      likes: 89,
      date: "2시간 전",
    },
    {
      id: "2",
      title: "2025 가을 트렌드 분석: 레이어드 룩의 귀환",
      author: "박스타일",
      status: "featured",
      views: 2150,
      likes: 156,
      date: "5시간 전",
    },
    {
      id: "3",
      title: "스트레이트 체형의 오피스 룩 완성하기",
      author: "이패션",
      status: "draft",
      views: 0,
      likes: 0,
      date: "1일 전",
    },
    {
      id: "4",
      title: "내추럴 체형을 위한 캐주얼 스타일링",
      author: "최스타일",
      status: "published",
      views: 890,
      likes: 67,
      date: "2일 전",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge style={{ backgroundColor: "#10b981" }}>발행됨</Badge>
      case "draft":
        return <Badge style={{ backgroundColor: "#f59e0b" }}>임시저장</Badge>
      case "featured":
        return <Badge style={{ backgroundColor: "#8b5cf6" }}>추천</Badge>
      default:
        return <Badge variant="secondary">알 수 없음</Badge>
    }
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <PageTitle>에디터 대시보드</PageTitle>
        <PageDescription>YOUR MODE 에디터 대시보드에 오신 것을 환영합니다.</PageDescription>
      </DashboardHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <CardHeader className="pb-2">
              <StatHeader>
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <StatIcon color={stat.color}>
                  <stat.icon size={20} />
                </StatIcon>
              </StatHeader>
            </CardHeader>
            <CardContent>
              <StatValue>{stat.value}</StatValue>
              <StatChange positive={stat.positive}>
                <TrendingUp size={12} />
                {stat.change} 지난 달 대비
              </StatChange>
            </CardContent>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentSection>
        <RecentContent>
          <CardHeader>
            <h3>최근 컨텐츠</h3>
          </CardHeader>
          <CardContent>
            {recentContents.map((content) => (
              <ContentItem key={content.id}>
                <ContentInfo>
                  <ContentTitle>{content.title}</ContentTitle>
                  <ContentMeta>
                    <span>작성자: {content.author}</span>
                    <span>조회수: {content.views}</span>
                    <span>좋아요: {content.likes}</span>
                    <span>{content.date}</span>
                  </ContentMeta>
                </ContentInfo>
                {getStatusBadge(content.status)}
              </ContentItem>
            ))}
            <div className="mt-4">
              <Link href="/editor/content">
                <Button variant="outline" className="w-full">
                  모든 컨텐츠 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </RecentContent>

        <QuickActions>
          <CardHeader>
            <h3>빠른 작업</h3>
          </CardHeader>
          <CardContent>
            <Link href="/editor/content/create">
              <ActionButton variant="outline">
                <PlusCircle size={16} style={{ marginRight: "0.5rem" }} />새 컨텐츠 작성
              </ActionButton>
            </Link>
            <Link href="/editor/applications">
              <ActionButton variant="outline">
                <MessageSquare size={16} style={{ marginRight: "0.5rem" }} />
                맞춤 컨텐츠 신청 관리
              </ActionButton>
            </Link>
            <Link href="/editor/analytics">
              <ActionButton variant="outline">
                <BarChart3 size={16} style={{ marginRight: "0.5rem" }} />
                통계 보기
              </ActionButton>
            </Link>
            <Link href="/editor/users">
              <ActionButton variant="outline">
                <Users size={16} style={{ marginRight: "0.5rem" }} />
                사용자 관리
              </ActionButton>
            </Link>
          </CardContent>
        </QuickActions>
      </ContentSection>
    </DashboardContainer>
  )
}
