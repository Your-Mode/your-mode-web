"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/src/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Badge } from "@/src/shared/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag, Clock, CheckCircle } from "lucide-react"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem 0;
`

const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const BackButton = styled(Button)`
  margin-bottom: 2rem;
`

const DetailCard = styled(Card)`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`

const InfoValue = styled.span`
  font-size: 1rem;
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
`

const TextContent = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ff3e6c;
  margin-bottom: 1rem;
`

const TimelineSection = styled.div`
  margin-top: 2rem;
`

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TimelineItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) => (props.completed ? "#f0fdf4" : "#f8f9fa")};
  border-radius: 8px;
  border-left: 4px solid ${(props) => (props.completed ? "#10b981" : "#e5e7eb")};
`

const TimelineIcon = styled.div<{ completed: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#10b981" : "#e5e7eb")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const TimelineContent = styled.div`
  flex: 1;
`

const TimelineTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`

const TimelineDate = styled.div`
  font-size: 0.875rem;
  color: #666;
`

// 샘플 데이터 (실제로는 API에서 가져올 데이터)
const sampleContentDetails = {
  "mc-001": {
    id: "mc-001",
    title: "오피스 룩 스타일링 요청",
    description: "직장에서 입을 수 있는 세미 캐주얼 스타일 추천을 요청했습니다.",
    applicationDate: "2025년 5월 15일",
    expectedDate: "2025년 5월 22일",
    editorName: "김스타일",
    status: "in-progress",
    progress: 75,
    formData: {
      name: "김정윤",
      bodyType: "웨이브 체형",
      height: "165",
      weight: "55",
      bodyFeatures:
        "어깨가 좁고 허리가 잘록한 편입니다. 하체가 상체보다 약간 더 볼륨감이 있어서 균형을 맞춰주는 스타일을 선호합니다.",
      recommendedItems: ["아우터", "상의", "하의", "신발"],
      situation:
        "직장에서 입을 수 있는 세미 캐주얼 스타일을 원합니다. 너무 격식을 차리지 않으면서도 전문적으로 보이는 스타일이면 좋겠습니다.",
      preferredStyle:
        "미니멀하고 깔끔한 스타일을 선호합니다. 블랙, 화이트, 베이지 등의 베이직한 컬러를 좋아하고, 과하지 않은 디테일이 있는 옷을 선호합니다.",
      avoidStyle: "너무 화려한 색상이나 과한 패턴은 피하고 싶어요. 또한 너무 타이트하거나 짧은 옷도 부담스럽습니다.",
      budget: "30만원 이내",
      uploadConsent: true,
    },
    timeline: [
      { step: "신청 접수", completed: true, date: "2025년 5월 15일" },
      { step: "에디터 배정", completed: true, date: "2025년 5월 16일" },
      { step: "스타일링 제작", completed: true, date: "진행 중" },
      { step: "검토 및 수정", completed: false, date: "" },
      { step: "최종 완성", completed: false, date: "" },
    ],
  },
  "mc-002": {
    id: "mc-002",
    title: "데이트 룩 스타일링 요청",
    description: "주말 데이트에 어울리는 캐주얼하면서도 세련된 스타일을 요청했습니다.",
    applicationDate: "2025년 5월 20일",
    expectedDate: "2025년 5월 27일",
    editorName: "박패션",
    status: "assigned",
    progress: 25,
    formData: {
      name: "김정윤",
      bodyType: "웨이브 체형",
      height: "165",
      weight: "55",
      bodyFeatures:
        "어깨가 좁고 허리가 잘록한 편입니다. 하체가 상체보다 약간 더 볼륨감이 있어서 균형을 맞춰주는 스타일을 선호합니다.",
      recommendedItems: ["원피스", "악세서리", "가방"],
      situation:
        "주말 데이트에서 입을 수 있는 스타일을 원합니다. 너무 캐주얼하지 않으면서도 편안하고 로맨틱한 느낌이면 좋겠습니다.",
      preferredStyle:
        "페미닌하고 로맨틱한 스타일을 선호합니다. 파스텔 톤이나 플로럴 패턴을 좋아하고, 여성스러운 실루엣의 옷을 선호합니다.",
      avoidStyle:
        "너무 어둡거나 무거운 색상은 피하고 싶어요. 또한 너무 캐주얼하거나 스포티한 스타일도 선호하지 않습니다.",
      budget: "20만원 이내",
      uploadConsent: true,
    },
    timeline: [
      { step: "신청 접수", completed: true, date: "2025년 5월 20일" },
      { step: "에디터 배정", completed: true, date: "2025년 5월 21일" },
      { step: "스타일링 제작", completed: false, date: "" },
      { step: "검토 및 수정", completed: false, date: "" },
      { step: "최종 완성", completed: false, date: "" },
    ],
  },
}

export default function ContentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contentId = params.id as string

  const contentDetail = sampleContentDetails[contentId as keyof typeof sampleContentDetails]

  if (!contentDetail) {
    return (
      <MainContainer>
        <MainContent>
          <BackButton variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={16} />
            돌아가기
          </BackButton>
          <Card>
            <CardContent className="text-center py-8">
              <p>해당 컨텐츠를 찾을 수 없습니다.</p>
            </CardContent>
          </Card>
        </MainContent>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <MainContent>
        <BackButton variant="outline" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          돌아가기
        </BackButton>

        <DetailCard>
          <CardHeader>
            <CardTitle>{contentDetail.title}</CardTitle>
            <CardDescription>{contentDetail.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>
                  <Calendar size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                  신청일
                </InfoLabel>
                <InfoValue>{contentDetail.applicationDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Clock size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                  예상 완료일
                </InfoLabel>
                <InfoValue>{contentDetail.expectedDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <User size={14} style={{ display: "inline", marginRight: "0.25rem" }} />
                  담당 에디터
                </InfoLabel>
                <InfoValue>{contentDetail.editorName}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </CardContent>
        </DetailCard>

        <DetailCard>
          <CardHeader>
            <CardTitle>신청 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionTitle>기본 정보</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>이름</InfoLabel>
                <InfoValue>{contentDetail.formData.name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>체형</InfoLabel>
                <InfoValue>{contentDetail.formData.bodyType}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>키</InfoLabel>
                <InfoValue>{contentDetail.formData.height}cm</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>몸무게</InfoLabel>
                <InfoValue>{contentDetail.formData.weight}kg</InfoValue>
              </InfoItem>
            </InfoGrid>

            <SectionTitle>체형적 특징</SectionTitle>
            <TextContent>{contentDetail.formData.bodyFeatures}</TextContent>

            <SectionTitle>추천 받고 싶은 아이템</SectionTitle>
            <ItemTags>
              {contentDetail.formData.recommendedItems.map((item, index) => (
                <ItemTag key={index}>
                  <Tag size={12} />
                  {item}
                </ItemTag>
              ))}
            </ItemTags>

            <SectionTitle>착용 상황</SectionTitle>
            <TextContent>{contentDetail.formData.situation}</TextContent>

            <SectionTitle>선호하는 스타일</SectionTitle>
            <TextContent>{contentDetail.formData.preferredStyle}</TextContent>

            <SectionTitle>피하고 싶은 스타일</SectionTitle>
            <TextContent>{contentDetail.formData.avoidStyle}</TextContent>

            <SectionTitle>예산</SectionTitle>
            <TextContent>{contentDetail.formData.budget}</TextContent>
          </CardContent>
        </DetailCard>

        <DetailCard>
          <CardHeader>
            <CardTitle>진행 상황</CardTitle>
          </CardHeader>
          <CardContent>
            <TimelineSection>
              <TimelineList>
                {contentDetail.timeline.map((step, index) => (
                  <TimelineItem key={index} completed={step.completed}>
                    <TimelineIcon completed={step.completed}>
                      {step.completed && <CheckCircle size={16} color="white" />}
                    </TimelineIcon>
                    <TimelineContent>
                      <TimelineTitle>{step.step}</TimelineTitle>
                      {step.date && <TimelineDate>{step.date}</TimelineDate>}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </TimelineList>
            </TimelineSection>
          </CardContent>
        </DetailCard>
      </MainContent>
    </MainContainer>
  )
}
