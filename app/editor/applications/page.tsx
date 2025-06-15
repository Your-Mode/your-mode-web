"use client"

import { useState } from "react"
import styled from "@emotion/styled"
import { Button } from "@/src/shared/components/ui/button"
import { Badge } from "@/src/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import { Search, Filter, ChevronDown, Eye, MessageSquare, CheckCircle, XCircle, Clock, FileText } from "lucide-react"
import { Input } from "@/src/shared/components/ui/input"
import Link from "next/link"

const PageContainer = styled.div`
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
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
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
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
  color: #666;
`

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ApplicationCard = styled(Card)`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`

const CardHeaderStyled = styled(CardHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
`

const CardTitleStyled = styled(CardTitle)`
  font-size: 1.125rem;
  font-weight: 600;
`

const StatusBadge = styled(Badge)<{ status: string }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#f59e0b"
      case "completed":
        return "#10b981"
      case "rejected":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }};
`

const ApplicationMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ApplicationContent = styled.div`
  margin-bottom: 1rem;
`

const ContentTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`

const ContentText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const Tag = styled(Badge)`
  background-color: #f3f4f6;
  color: #4b5563;
  font-weight: 500;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ActionButton = styled(Button)<{ variant?: string }>`
  flex: 1;
  
  @media (max-width: 640px) {
    width: 100%;
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const PaginationButton = styled(Button)`
  margin: 0 0.25rem;
`

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #666;
`

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <StatusBadge status="pending">
          <Clock size={14} style={{ marginRight: "0.25rem" }} />
          대기중
        </StatusBadge>
      )
    case "completed":
      return (
        <StatusBadge status="completed">
          <CheckCircle size={14} style={{ marginRight: "0.25rem" }} />
          완료
        </StatusBadge>
      )
    case "rejected":
      return (
        <StatusBadge status="rejected">
          <XCircle size={14} style={{ marginRight: "0.25rem" }} />
          거절
        </StatusBadge>
      )
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // 샘플 데이터
  const applications = [
    {
      id: "1",
      name: "김정윤",
      bodyType: "웨이브 체형",
      date: "2025-06-07",
      status: "pending",
      height: "165cm",
      weight: "55kg",
      bodyFeatures: "어깨가 좁고 허리가 잘록한 편입니다. 하체는 약간 통통한 편이에요.",
      situation: "회사 중요 미팅이 있어서 전문적이면서도 세련된 느낌의 옷을 찾고 있어요.",
      preferredStyle: "미니멀하고 세련된 오피스룩을 선호합니다. 무채색 계열을 좋아해요.",
      items: ["아우터", "상의", "하의", "신발"],
    },
    {
      id: "2",
      name: "이민지",
      bodyType: "스트레이트 체형",
      date: "2025-06-06",
      status: "completed",
      height: "170cm",
      weight: "58kg",
      bodyFeatures: "키가 크고 마른 편이며, 어깨와 골반이 일직선으로 떨어지는 체형입니다.",
      situation: "친구 결혼식에 참석해야 해서 하객 패션으로 적합한 스타일링이 필요해요.",
      preferredStyle: "페미닌한 스타일을 좋아하고, 파스텔 톤의 색상을 선호합니다.",
      items: ["원피스", "아우터", "악세서리"],
      contentId: "content-2", // 완료된 컨텐츠 ID
    },
    {
      id: "3",
      name: "박서준",
      bodyType: "내추럴 체형",
      date: "2025-06-05",
      status: "rejected",
      height: "178cm",
      weight: "75kg",
      bodyFeatures: "어깨가 넓고 상체가 발달한 편입니다. 다리는 약간 짧은 편이에요.",
      situation: "소개팅이 있어서 캐주얼하면서도 세련된 첫인상을 줄 수 있는 코디가 필요합니다.",
      preferredStyle: "스트릿 캐주얼을 좋아하고, 편안하면서도 트렌디한 스타일을 추구합니다.",
      items: ["아우터", "상의", "하의", "신발", "악세서리"],
    },
    {
      id: "4",
      name: "최유진",
      bodyType: "웨이브 체형",
      date: "2025-06-04",
      status: "pending",
      height: "162cm",
      weight: "52kg",
      bodyFeatures: "허리가 잘록하고 골반이 넓은 편입니다. 상체는 작은 편이에요.",
      situation: "여름 휴가를 위한 비치 웨어와 리조트 룩이 필요합니다.",
      preferredStyle: "화려한 패턴과 컬러풀한 스타일을 좋아합니다. 편안하면서도 스타일리시한 룩을 원해요.",
      items: ["상의", "하의", "수영복", "악세서리"],
    },
    {
      id: "5",
      name: "정도윤",
      bodyType: "스트레이트 체형",
      date: "2025-06-03",
      status: "completed",
      height: "182cm",
      weight: "70kg",
      bodyFeatures: "키가 크고 마른 편이며, 팔다리가 긴 편입니다.",
      situation: "취업 면접이 있어서 단정하고 프로페셔널한 느낌의 정장 스타일링이 필요합니다.",
      preferredStyle: "클래식한 스타일을 선호하며, 네이비나 그레이 계열의 색상을 좋아합니다.",
      items: ["정장", "셔츠", "넥타이", "구두"],
      contentId: "content-5", // 완료된 컨텐츠 ID
    },
    {
      id: "6",
      name: "한소희",
      bodyType: "내추럴 체형",
      date: "2025-06-02",
      status: "pending",
      height: "168cm",
      weight: "63kg",
      bodyFeatures: "어깨가 넓고 골반도 넓은 편입니다. 체격이 탄탄한 편이에요.",
      situation: "가을 시즌에 맞는 데일리 캐주얼 코디가 필요합니다.",
      preferredStyle: "편안하면서도 세련된 캐주얼 룩을 좋아합니다. 어스 톤 컬러를 선호해요.",
      items: ["아우터", "상의", "하의", "신발"],
    },
  ]

  // 탭과 검색어에 따라 필터링
  const filteredApplications = applications.filter((app) => {
    // 탭 필터링
    if (activeTab !== "all" && app.status !== activeTab) return false

    // 검색어 필터링
    if (searchQuery && !app.name.includes(searchQuery) && !app.bodyType.includes(searchQuery)) return false

    return true
  })

  // 페이지네이션 (한 페이지에 6개씩)
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const currentItems = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>맞춤 컨텐츠 신청 관리</PageTitle>
        <PageDescription>사용자들이 신청한 맞춤 스타일링 컨텐츠 요청을 관리하고 처리할 수 있습니다.</PageDescription>
      </PageHeader>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">대기중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
          <TabsTrigger value="rejected">거절</TabsTrigger>
        </TabsList>
      </Tabs>

      <FilterSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="이름, 체형으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
        </SearchContainer>

        <FilterButton variant="outline">
          <Filter size={16} />
          필터
          <ChevronDown size={14} />
        </FilterButton>
      </FilterSection>

      {currentItems.length > 0 ? (
        <ApplicationsGrid>
          {currentItems.map((application) => (
            <ApplicationCard key={application.id}>
              <CardHeaderStyled>
                <CardTitleStyled>{application.name}</CardTitleStyled>
                {getStatusBadge(application.status)}
              </CardHeaderStyled>
              <CardContent>
                <ApplicationMeta>
                  <MetaItem>체형: {application.bodyType}</MetaItem>
                  <MetaItem>
                    신체: {application.height} / {application.weight}
                  </MetaItem>
                  <MetaItem>신청일: {application.date}</MetaItem>
                </ApplicationMeta>

                <ApplicationContent>
                  <ContentTitle>체형적 특징</ContentTitle>
                  <ContentText>{application.bodyFeatures}</ContentText>
                </ApplicationContent>

                <ApplicationContent>
                  <ContentTitle>상황 설명</ContentTitle>
                  <ContentText>{application.situation}</ContentText>
                </ApplicationContent>

                <ContentTitle>요청 아이템</ContentTitle>
                <TagsContainer>
                  {application.items.map((item, index) => (
                    <Tag key={index}>{item}</Tag>
                  ))}
                </TagsContainer>

                <ActionButtons>
                  <Link href={`/editor/applications/${application.id}`} style={{ flex: 1 }}>
                    <ActionButton variant="outline" style={{ width: "100%" }}>
                      <Eye size={16} style={{ marginRight: "0.25rem" }} />
                      상세보기
                    </ActionButton>
                  </Link>

                  {application.status === "pending" && (
                    <Link href={`/editor/content/create?application=${application.id}`} style={{ flex: 1 }}>
                      <ActionButton style={{ width: "100%" }}>
                        <MessageSquare size={16} style={{ marginRight: "0.25rem" }} />
                        컨텐츠 작성
                      </ActionButton>
                    </Link>
                  )}

                  {application.status === "completed" && (
                    <Link href={`/content/${application.contentId || application.id}`} style={{ flex: 1 }}>
                      <ActionButton style={{ width: "100%" }}>
                        <FileText size={16} style={{ marginRight: "0.25rem" }} />
                        작성 내용 보기
                      </ActionButton>
                    </Link>
                  )}
                </ActionButtons>
              </CardContent>
            </ApplicationCard>
          ))}
        </ApplicationsGrid>
      ) : (
        <NoResults>
          <p>검색 결과가 없습니다.</p>
        </NoResults>
      )}

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationButton
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationButton>
          ))}

          <PaginationButton
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </PaginationButton>
        </PaginationContainer>
      )}
    </PageContainer>
  )
}
