"use client"

import { useState } from "react"
import { Button } from "@/src/shared/components/ui/button"
import { Badge } from "@/src/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Progress } from "@/src/shared/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import {
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Calendar,
  Tag,
  ArrowRight,
  Search,
  Star,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/src/shared/components/ui/input"
import { Textarea } from "@/src/shared/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog"
import { Label } from "@/src/shared/components/ui/label"
import Link from "next/link"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
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
  max-width: 800px;
`

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
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

const FilterTabs = styled(TabsList)`
  background-color: white;
  border: 1px solid #e5e7eb;
`

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ContentCard = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #ff3e6c;
  }
`

const CardHeaderSection = styled(CardHeader)`
  padding-bottom: 1rem;
`

const ContentHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`

const ContentInfo = styled.div`
  flex: 1;
`

const ContentTitle = styled(CardTitle)`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`

const ContentMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;
  
  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 120px;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    min-width: auto;
  }
`

const StatusBadge = styled(Badge)<{
  status: "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"
}>`
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#f59e0b"
      case "assigned":
        return "#8b5cf6"
      case "in-progress":
        return "#3b82f6"
      case "review":
        return "#06b6d4"
      case "completed":
        return "#10b981"
      case "cancelled":
        return "#ef4444"
      default:
        return "#f59e0b"
    }
  }};
  
  &:hover {
    background-color: ${(props) => {
      switch (props.status) {
        case "pending":
          return "#d97706"
        case "assigned":
          return "#7c3aed"
        case "in-progress":
          return "#2563eb"
        case "review":
          return "#0891b2"
        case "completed":
          return "#059669"
        case "cancelled":
          return "#dc2626"
        default:
          return "#d97706"
      }
    }};
  }
`

const ProgressSection = styled.div`
  margin: 1rem 0;
`

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

const ProgressLabel = styled.span`
  color: #666;
  font-weight: 500;
`

const ProgressValue = styled.span`
  color: #333;
  font-weight: 600;
`

const ItemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const ItemTag = styled(Badge)`
  background-color: rgba(255, 62, 108, 0.1);
  color: #ff3e6c;
  border: 1px solid rgba(255, 62, 108, 0.2);
  
  &:hover {
    background-color: rgba(255, 62, 108, 0.15);
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const TimelineSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`

const TimelineTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TimelineItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => (props.completed ? "#10b981" : "#666")};
`

const TimelineIcon = styled.div<{ completed: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#10b981" : "#e5e7eb")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`

const EmptyIcon = styled.div`
  margin-bottom: 1rem;
  color: #d1d5db;
`

const EmptyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
`

const EmptyDescription = styled.p`
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`

const StarButton = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#fbbf24" : "#d1d5db")};
  transition: color 0.2s;
  
  &:hover {
    color: #fbbf24;
  }
`

type ContentStatus = "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"

interface MyContentItem {
  id: string
  title: string
  description: string
  status: ContentStatus
  progress: number
  applicationDate: string
  expectedDate?: string
  editorName?: string
  items: string[]
  timeline: {
    step: string
    completed: boolean
    date?: string
  }[]
}

export default function MyContentPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  // 샘플 데이터
  const myContents: MyContentItem[] = [
    {
      id: "mc-001",
      title: "오피스 룩 스타일링 요청",
      description:
        "직장에서 입을 수 있는 세미 캐주얼 스타일 추천을 요청했습니다. 키 165cm, 웨이브 체형에 맞는 전문적이면서도 편안한 스타일을 원합니다.",
      status: "in-progress",
      progress: 75,
      applicationDate: "2025년 5월 15일",
      expectedDate: "2025년 5월 22일",
      editorName: "김스타일",
      items: ["아우터", "상의", "하의", "신발"],
      timeline: [
        { step: "신청 접수", completed: true, date: "2025년 5월 15일" },
        { step: "에디터 배정", completed: true, date: "2025년 5월 16일" },
        { step: "스타일링 제작", completed: true, date: "진행 중" },
        { step: "검토 및 수정", completed: false },
        { step: "최종 완성", completed: false },
      ],
    },
    {
      id: "mc-002",
      title: "데이트 룩 스타일링 요청",
      description:
        "주말 데이트에 어울리는 캐주얼하면서도 세련된 스타일을 요청했습니다. 20대 후반, 웨이브 체형에 맞는 로맨틱한 느낌의 코디를 원합니다.",
      status: "assigned",
      progress: 25,
      applicationDate: "2025년 5월 20일",
      expectedDate: "2025년 5월 27일",
      editorName: "박패션",
      items: ["원피스", "악세서리", "가방"],
      timeline: [
        { step: "신청 접수", completed: true, date: "2025년 5월 20일" },
        { step: "에디터 배정", completed: true, date: "2025년 5월 21일" },
        { step: "스타일링 제작", completed: false },
        { step: "검토 및 수정", completed: false },
        { step: "최종 완성", completed: false },
      ],
    },
    {
      id: "mc-003",
      title: "여름 휴가 스타일링 요청",
      description:
        "해변 리조트에서 입을 수 있는 시원하고 편안한 스타일을 요청했습니다. 30대 초반, 웨이브 체형에 맞는 리조트 룩을 원합니다.",
      status: "completed",
      progress: 100,
      applicationDate: "2025년 4월 10일",
      expectedDate: "2025년 4월 17일",
      editorName: "이디자인",
      items: ["상의", "하의", "신발", "모자"],
      timeline: [
        { step: "신청 접수", completed: true, date: "2025년 4월 10일" },
        { step: "에디터 배정", completed: true, date: "2025년 4월 11일" },
        { step: "스타일링 제작", completed: true, date: "2025년 4월 15일" },
        { step: "검토 및 수정", completed: true, date: "2025년 4월 16일" },
        { step: "최종 완성", completed: true, date: "2025년 4월 17일" },
      ],
    },
    {
      id: "mc-004",
      title: "결혼식 하객 룩 스타일링 요청",
      description:
        "친구 결혼식에 참석할 때 입을 수 있는 격식 있는 스타일을 요청했습니다. 웨이브 체형에 맞는 우아하고 단정한 룩을 원합니다.",
      status: "pending",
      progress: 10,
      applicationDate: "2025년 5월 25일",
      expectedDate: "2025년 6월 1일",
      items: ["원피스", "악세서리", "신발", "가방"],
      timeline: [
        { step: "신청 접수", completed: true, date: "2025년 5월 25일" },
        { step: "에디터 배정", completed: false },
        { step: "스타일링 제작", completed: false },
        { step: "검토 및 수정", completed: false },
        { step: "최종 완성", completed: false },
      ],
    },
  ]

  const getStatusText = (status: ContentStatus) => {
    switch (status) {
      case "pending":
        return "접수 완료"
      case "assigned":
        return "에디터 배정"
      case "in-progress":
        return "제작 중"
      case "review":
        return "검토 중"
      case "completed":
        return "완료"
      case "cancelled":
        return "취소됨"
      default:
        return "접수 완료"
    }
  }

  const getStatusIcon = (status: ContentStatus) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />
      case "assigned":
        return <User size={14} />
      case "in-progress":
        return <FileText size={14} />
      case "review":
        return <Eye size={14} />
      case "completed":
        return <CheckCircle size={14} />
      case "cancelled":
        return <AlertCircle size={14} />
      default:
        return <Clock size={14} />
    }
  }

  const handleReviewSubmit = () => {
    console.log("Review submitted:", { contentId: selectedContentId, rating, reviewText })
    setReviewModalOpen(false)
    setSelectedContentId(null)
    setRating(0)
    setReviewText("")
    // 여기에 실제 리뷰 제출 로직 추가
  }

  // 필터링 로직
  const filteredContents = myContents.filter((content) => {
    const matchesSearch = searchQuery
      ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesTab = activeTab === "all" ? true : content.status === activeTab

    return matchesSearch && matchesTab
  })

  const tabCounts = {
    all: myContents.length,
    pending: myContents.filter((c) => c.status === "pending").length,
    "in-progress": myContents.filter((c) => c.status === "in-progress" || c.status === "assigned").length,
    completed: myContents.filter((c) => c.status === "completed").length,
  }

  return (
    <MainContainer>
      <MainContent>
        <PageHeader>
          <PageTitle>나만의 맞춤형 컨텐츠</PageTitle>
          <PageDescription>신청한 맞춤형 스타일링 컨텐츠의 진행 상황을 확인하고 관리하세요.</PageDescription>
        </PageHeader>

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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <FilterTabs>
              <TabsTrigger value="all">전체 ({tabCounts.all})</TabsTrigger>
              <TabsTrigger value="pending">대기 중 ({tabCounts.pending})</TabsTrigger>
              <TabsTrigger value="in-progress">진행 중 ({tabCounts["in-progress"]})</TabsTrigger>
              <TabsTrigger value="completed">완료 ({tabCounts.completed})</TabsTrigger>
            </FilterTabs>
          </Tabs>
        </FilterSection>

        {filteredContents.length > 0 ? (
          <ContentList>
            {filteredContents.map((content) => (
              <ContentCard key={content.id}>
                <CardHeaderSection>
                  <ContentHeader>
                    <ContentInfo>
                      <ContentTitle>{content.title}</ContentTitle>
                      <ContentMeta>
                        <MetaItem>
                          <Calendar size={14} />
                          신청일: {content.applicationDate}
                        </MetaItem>
                        {content.expectedDate && (
                          <MetaItem>
                            <Clock size={14} />
                            예상 완료: {content.expectedDate}
                          </MetaItem>
                        )}
                        {content.editorName && (
                          <MetaItem>
                            <User size={14} />
                            담당 에디터: {content.editorName}
                          </MetaItem>
                        )}
                      </ContentMeta>
                      <CardDescription>{content.description}</CardDescription>
                    </ContentInfo>

                    <StatusSection>
                      <StatusBadge status={content.status}>
                        {getStatusIcon(content.status)}
                        {getStatusText(content.status)}
                      </StatusBadge>
                    </StatusSection>
                  </ContentHeader>
                </CardHeaderSection>

                <CardContent>
                  <ProgressSection>
                    <ProgressHeader>
                      <ProgressLabel>진행 상황</ProgressLabel>
                      <ProgressValue>{content.progress}%</ProgressValue>
                    </ProgressHeader>
                    <Progress value={content.progress} className="h-2" />
                  </ProgressSection>

                  <ItemTags>
                    {content.items.map((item, index) => (
                      <ItemTag key={index} variant="outline">
                        <Tag size={12} />
                        {item}
                      </ItemTag>
                    ))}
                  </ItemTags>

                  <TimelineSection>
                    <TimelineTitle>진행 단계</TimelineTitle>
                    <TimelineList>
                      {content.timeline.map((step, index) => (
                        <TimelineItem key={index} completed={step.completed}>
                          <TimelineIcon completed={step.completed}>
                            {step.completed && <CheckCircle size={12} color="white" />}
                          </TimelineIcon>
                          <span>{step.step}</span>
                          {step.date && <span className="text-xs">({step.date})</span>}
                        </TimelineItem>
                      ))}
                    </TimelineList>
                  </TimelineSection>

                  <ActionButtons>
                    <Link href={`/my-content/detail/${content.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye size={16} />
                        상세 보기
                      </Button>
                    </Link>
                    {content.status === "completed" && (
                      <>
                        <Button size="sm">
                          결과 확인
                          <ArrowRight size={16} />
                        </Button>
                        <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedContentId(content.id)}>
                              <MessageSquare size={16} />
                              후기 작성
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>스타일링 후기 작성</DialogTitle>
                              <DialogDescription>
                                받으신 스타일링 서비스는 어떠셨나요? 솔직한 후기를 남겨주세요.
                              </DialogDescription>
                            </DialogHeader>
                            <ReviewForm>
                              <div>
                                <Label htmlFor="rating">만족도</Label>
                                <StarRating>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <StarButton
                                      key={star}
                                      type="button"
                                      filled={star <= rating}
                                      onClick={() => setRating(star)}
                                    >
                                      <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                                    </StarButton>
                                  ))}
                                </StarRating>
                              </div>
                              <div>
                                <Label htmlFor="review">후기 내용</Label>
                                <Textarea
                                  id="review"
                                  placeholder="스타일링 서비스에 대한 솔직한 후기를 작성해주세요..."
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                            </ReviewForm>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setReviewModalOpen(false)}>
                                취소
                              </Button>
                              <Button onClick={handleReviewSubmit} disabled={rating === 0 || !reviewText.trim()}>
                                후기 등록
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    {(content.status === "pending" || content.status === "assigned") && (
                      <Button variant="outline" size="sm">
                        수정 요청
                      </Button>
                    )}
                  </ActionButtons>
                </CardContent>
              </ContentCard>
            ))}
          </ContentList>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <FileText size={64} />
            </EmptyIcon>
            <EmptyTitle>{searchQuery ? "검색 결과가 없습니다" : "아직 신청한 맞춤형 컨텐츠가 없습니다"}</EmptyTitle>
            <EmptyDescription>
              {searchQuery ? "다른 검색어로 시도해보세요." : "나만을 위한 맞춤형 스타일링 컨텐츠를 신청해보세요."}
            </EmptyDescription>
            {!searchQuery && (
              <Link href="/content-application">
                <Button>
                  맞춤형 컨텐츠 신청하기
                  <ArrowRight size={16} />
                </Button>
              </Link>
            )}
          </EmptyState>
        )}

        {filteredContents.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/content-application">
              <Button>
                새로운 맞춤형 컨텐츠 신청하기
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        )}
      </MainContent>
    </MainContainer>
  )
}
