"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styled from "@emotion/styled"
import { Button } from "@/src/shared/components/ui/button"
import { Badge } from "@/src/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/components/ui/select"
import { Separator } from "@/src/shared/components/ui/separator"
import {
  ArrowLeft,
  MessageSquare,
  User,
  Phone,
  Calendar,
  Ruler,
  Weight,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  Trash,
} from "lucide-react"
import Link from "next/link"

const PageContainer = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const BackButton = styled(Button)`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const HeaderLeft = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    width: 100%;
    
    > button {
      flex: 1;
    }
  }
`

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const ApplicationDate = styled.p`
  color: #666;
  font-size: 0.875rem;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const SectionCard = styled(Card)`
  overflow: hidden;
`

const SectionHeader = styled(CardHeader)`
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
`

const SectionTitle = styled(CardTitle)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`

const SectionContent = styled(CardContent)`
  padding: 1.5rem;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const InfoValue = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`

const ContentSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ContentTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`

const ContentText = styled.p`
  font-size: 0.9375rem;
  color: #4b5563;
  line-height: 1.6;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const Tag = styled(Badge)`
  background-color: #f3f4f6;
  color: #4b5563;
  font-weight: 500;
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
      case "writing":
        return "#3b82f6" // 파란색
      default:
        return "#6b7280"
    }
  }};
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  height: auto;
`

const StatusSelectContainer = styled.div`
  margin-bottom: 1.5rem;
`

const FeedbackContainer = styled.div`
  margin-top: 1.5rem;
`

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

const FeedbackTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`

const FeedbackActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const FeedbackContent = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`

const NoFeedback = styled.div`
  color: #6b7280;
  font-style: italic;
  text-align: center;
  padding: 1.5rem;
  background-color: #f9fafb;
  border: 1px dashed #e5e7eb;
  border-radius: 0.375rem;
`

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const ActionButton = styled(Button)<{ variant?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
    case "writing":
      return (
        <StatusBadge status="writing">
          <Edit size={14} style={{ marginRight: "0.25rem" }} />
          작성중
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

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  // 상태 관리
  const [status, setStatus] = useState("pending")
  const [feedback, setFeedback] = useState("")
  const [isEditingFeedback, setIsEditingFeedback] = useState(false)
  const [tempFeedback, setTempFeedback] = useState("")

  // 샘플 데이터 (실제로는 API에서 가져와야 함)
  const application = {
    id: id,
    name: "김정윤",
    email: "jykim@example.com",
    phone: "010-1234-5678",
    bodyType: "웨이브 체형",
    date: "2025-06-07",
    status: "pending",
    height: "165cm",
    weight: "55kg",
    bodyFeatures:
      "어깨가 좁고 허리가 잘록한 편입니다. 하체는 약간 통통한 편이에요. 허벅지와 종아리 부분에 살이 잘 찌는 편이고, 상체는 비교적 마른 편입니다. 허리가 잘록해서 허리를 강조하는 스타일이 잘 어울립니다.",
    situation:
      "회사 중요 미팅이 있어서 전문적이면서도 세련된 느낌의 옷을 찾고 있어요. 첫 거래처 미팅이라 좋은 인상을 주고 싶습니다. 너무 과하지 않으면서도 프로페셔널한 느낌을 주고 싶어요.",
    preferredStyle:
      "미니멀하고 세련된 오피스룩을 선호합니다. 무채색 계열을 좋아해요. 특히 블랙, 화이트, 그레이 컬러를 자주 입고, 깔끔한 실루엣의 옷을 좋아합니다. 과한 장식이나 패턴은 부담스러워요.",
    avoidStyle: "너무 화려한 색상이나 과한 패턴은 피하고 싶어요. 또한 너무 타이트하거나 짧은 옷도 부담스럽습니다.",
    budget: "30만원 이내",
    items: ["아우터", "상의", "하의", "신발"],
    additionalInfo:
      "평소 M 사이즈를 입고, 신발은 235mm를 신어요. 허리를 강조하는 스타일이 잘 어울린다는 얘기를 자주 들어요.",
  }

  // 상태 변경 핸들러
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // 실제로는 API 호출로 상태 업데이트
  }

  // 피드백 저장 핸들러
  const handleSaveFeedback = () => {
    setFeedback(tempFeedback)
    setIsEditingFeedback(false)
    // 실제로는 API 호출로 피드백 저장
  }

  // 피드백 편집 시작
  const handleEditFeedback = () => {
    setTempFeedback(feedback)
    setIsEditingFeedback(true)
  }

  // 피드백 삭제
  const handleDeleteFeedback = () => {
    setFeedback("")
    // 실제로는 API 호출로 피드백 삭제
  }

  return (
    <PageContainer>
      <BackButton variant="ghost" onClick={() => router.push("/editor/applications")}>
        <ArrowLeft size={16} />
        목록으로 돌아가기
      </BackButton>

      <PageHeader>
        <HeaderLeft>
          <PageTitle>
            {application.name}님의 맞춤 컨텐츠 신청
            {getStatusBadge(status)}
          </PageTitle>
          <ApplicationDate>신청일: {application.date}</ApplicationDate>
        </HeaderLeft>

        <HeaderRight>
          <Link href={`/editor/content/create?application=${id}`} style={{ display: "contents" }}>
            <Button>
              <MessageSquare size={16} style={{ marginRight: "0.25rem" }} />
              컨텐츠 작성
            </Button>
          </Link>
        </HeaderRight>
      </PageHeader>

      <ContentGrid>
        <MainContent>
          <SectionCard>
            <SectionHeader>
              <SectionTitle>신청 내용</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <ContentSection>
                <ContentTitle>체형적 특징</ContentTitle>
                <ContentText>{application.bodyFeatures}</ContentText>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>상황 설명</ContentTitle>
                <ContentText>{application.situation}</ContentText>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>선호하는 스타일</ContentTitle>
                <ContentText>{application.preferredStyle}</ContentText>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>피하고 싶은 스타일</ContentTitle>
                <ContentText>{application.avoidStyle}</ContentText>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>예산</ContentTitle>
                <ContentText>{application.budget}</ContentText>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>요청 아이템</ContentTitle>
                <TagsContainer>
                  {application.items.map((item, index) => (
                    <Tag key={index}>{item}</Tag>
                  ))}
                </TagsContainer>
              </ContentSection>

              <Separator className="my-4" />

              <ContentSection>
                <ContentTitle>추가 정보</ContentTitle>
                <ContentText>{application.additionalInfo}</ContentText>
              </ContentSection>
            </SectionContent>
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <SectionTitle>관리자 피드백</SectionTitle>
            </SectionHeader>
            <SectionContent>
              {isEditingFeedback ? (
                <>
                  <Textarea
                    value={tempFeedback}
                    onChange={(e) => setTempFeedback(e.target.value)}
                    placeholder="신청에 대한 피드백이나 메모를 입력하세요..."
                    rows={5}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsEditingFeedback(false)}>
                      취소
                    </Button>
                    <Button onClick={handleSaveFeedback}>
                      <Save size={16} className="mr-1" />
                      저장
                    </Button>
                  </div>
                </>
              ) : feedback ? (
                <>
                  <FeedbackHeader>
                    <FeedbackTitle>피드백</FeedbackTitle>
                    <FeedbackActions>
                      <Button variant="ghost" size="sm" onClick={handleEditFeedback}>
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDeleteFeedback}>
                        <Trash size={14} />
                      </Button>
                    </FeedbackActions>
                  </FeedbackHeader>
                  <FeedbackContent>{feedback}</FeedbackContent>
                </>
              ) : (
                <>
                  <NoFeedback>아직 입력된 피드백이 없습니다.</NoFeedback>
                  <Button className="w-full mt-4" onClick={handleEditFeedback}>
                    <Edit size={16} className="mr-1" />
                    피드백 작성
                  </Button>
                </>
              )}
            </SectionContent>
          </SectionCard>
        </MainContent>

        <SideContent>
          <SectionCard>
            <SectionHeader>
              <SectionTitle>신청자 정보</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>
                    <User size={16} />
                    이름
                  </InfoLabel>
                  <InfoValue>{application.name}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>
                    <Phone size={16} />
                    연락처
                  </InfoLabel>
                  <InfoValue>{application.phone}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>
                    <Calendar size={16} />
                    신청일
                  </InfoLabel>
                  <InfoValue>{application.date}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>이메일</InfoLabel>
                  <InfoValue>{application.email}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </SectionContent>
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <SectionTitle>체형 정보</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>체형 타입</InfoLabel>
                  <InfoValue>{application.bodyType}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>
                    <Ruler size={16} />키
                  </InfoLabel>
                  <InfoValue>{application.height}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>
                    <Weight size={16} />
                    몸무게
                  </InfoLabel>
                  <InfoValue>{application.weight}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </SectionContent>
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <SectionTitle>상태 관리</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <StatusSelectContainer>
                <label className="block text-sm font-medium text-gray-700 mb-1">현재 상태</label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">대기중</SelectItem>
                    <SelectItem value="writing">작성중</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="rejected">거절</SelectItem>
                  </SelectContent>
                </Select>
              </StatusSelectContainer>

              <ActionButtons>
                <ActionButton variant="outline">
                  <MessageSquare size={16} />
                  신청자에게 연락
                </ActionButton>

                <Link href={`/editor/content/create?application=${id}`} style={{ width: "100%" }}>
                  <ActionButton>
                    <Edit size={16} />
                    컨텐츠 작성
                  </ActionButton>
                </Link>
              </ActionButtons>
            </SectionContent>
          </SectionCard>
        </SideContent>
      </ContentGrid>
    </PageContainer>
  )
}
