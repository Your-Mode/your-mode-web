import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileCheck, FileText,
  Search,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Progress } from "@/src/shared/components/ui/progress";
import { Button } from "@/src/shared/components/ui/button";
import Link from "next/link";
import EmptyState from "./EmptyState";
import { myCustomContents } from "@/src/shared/api/mock";
import { useState } from "react";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { Badge } from "@/src/shared/components/ui/badge";
import { ContentRequestItem } from "@/src/shared/api/content";

interface ProgressContentProps {
  data: ContentRequestItem[] | undefined;
  setThankYouModalOpen: (open: boolean) => void;
}

const ProgressContent = ({ setThankYouModalOpen, data }: ProgressContentProps) => {
  const [activeCustomTab, setActiveCustomTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [expandedTimelines, setExpandedTimelines] = useState<Set<string>>(new Set());
  console.log("data", data);

  const getStatusText = (status: string) => {
    switch (status) {
      case "신청 접수":
        return "접수 완료";
      case "에디터 배정":
        return "에디터 배정";
      case "스타일링 제작":
        return "제작 중";
      case "검토 및 수정":
        return "검토 중";
      case "최종 완성":
        return "완료";
      case "취소됨":
        return "취소됨";
      default:
        return "접수 완료";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "신청 접수":
        return <Clock size={14} />;
      case "에디터 배정":
        return <User size={14} />;
      case "스타일링 제작":
        return <FileText size={14} />;
      case "검토 및 수정":
        return <AlertCircle size={14} />;
      case "최종 완성":
        return <CheckCircle size={14} />;
      case "취소됨":
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const toggleTimeline = (contentId: string) => {
    const newExpanded = new Set(expandedTimelines);
    if (newExpanded.has(contentId)) {
      newExpanded.delete(contentId);
    } else {
      newExpanded.add(contentId);
    }
    setExpandedTimelines(newExpanded);
  };

  const handleReviewSubmit = () => {
    console.log("Review submitted:", { contentId: selectedContentId, rating, reviewText });
    setReviewModalOpen(false);
    setThankYouModalOpen(true);
    setSelectedContentId(null);
    setRating(0);
    setReviewText("");
  };

  // 필터링 로직
  const filteredContents = myCustomContents.filter((content) => {
    const matchesSearch = searchQuery
      ? content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesTab = activeCustomTab === "all" ? true : content.status === activeCustomTab;

    return matchesSearch && matchesTab;
  });

  const tabCounts = {
    all: myCustomContents.length,
    pending: myCustomContents.filter((c) => c.status === "pending").length,
    "in-progress": myCustomContents.filter((c) => c.status === "in-progress" || c.status === "assigned").length,
    completed: myCustomContents.filter((c) => c.status === "completed").length,
  };

  const changeLocalDate = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('ko-KR', options);
  }

  return (
    <TabsContent value="progress">
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

        <Tabs value={activeCustomTab} onValueChange={setActiveCustomTab}>
          <FilterTabs>
            <TabsTrigger value="all">전체 ({data?.length})</TabsTrigger>
            <TabsTrigger value="pending">대기 중 ({tabCounts.pending})</TabsTrigger>
            <TabsTrigger value="in-progress">진행 중 ({tabCounts["in-progress"]})</TabsTrigger>
            <TabsTrigger value="completed">완료 ({tabCounts.completed})</TabsTrigger>
          </FilterTabs>
        </Tabs>
      </FilterSection>

      {data?.length! > 0 ? (
        <ContentList>
          {data?.map((content) => (
            <ContentCard key={content.id}>
              <CardHeaderSection>
                <ContentHeader>
                  <ContentInfo>
                    <ContentTitle>{changeLocalDate(content.createdAt)} 요청</ContentTitle>
                    <ContentMeta>
                      <MetaItem>
                        <Calendar size={14} />
                        신청일: {changeLocalDate(content.createdAt)}
                      </MetaItem>
                      {content.statusHistories[0]?.editorName && (
                        <MetaItem>
                          <User size={14} />
                          담당 에디터: {content.statusHistories[0]?.editorName}
                        </MetaItem>
                      )}
                    </ContentMeta>
                    <CardDescription>작성한 체형 특징: {content.bodyFeature}</CardDescription>
                    <CardDescription>작성한 상황: {content.situation}</CardDescription>
                    <CardDescription>예산: {content.budget}만원</CardDescription>
                  </ContentInfo>

                  <StatusSection>
                    <StatusBadge status={content.statusHistories[content.statusHistories.length - 1].statusName}>
                      {getStatusIcon(content.statusHistories[content.statusHistories.length - 1].statusName)}
                      {getStatusText(content.statusHistories[content.statusHistories.length - 1].statusName)}
                    </StatusBadge>
                  </StatusSection>
                </ContentHeader>
              </CardHeaderSection>

              <CardContent>
                <ProgressSection>
                  <ProgressHeader>
                    <ProgressLabel>진행 상황</ProgressLabel>
                    <ProgressValue>{content.statusHistories.length * 20}%</ProgressValue>
                  </ProgressHeader>
                  <Progress value={content.statusHistories.length * 20} className="h-2" />
                </ProgressSection>
                {/*<ItemTags>
                  {content.recommendedStyle.items.map((item, index) => (
                    <ItemTag key={index} variant="outline">
                      <Tag size={12} />
                      {item}
                    </ItemTag>
                  ))}
                </ItemTags>*/}

               {/* <TimelineSection isExpanded={expandedTimelines.has(content.id)}>
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
                </TimelineSection>*/}

                <ActionButtons>
                  {/*<Button variant="outline" size="sm" onClick={() => toggleTimeline(content.id)}>
                    {expandedTimelines.has(content.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    진행 단계 확인
                  </Button>*/}
                  <Link href={`/mypage/detail/${content.id}`}>
                    <Button variant="outline" size="sm">
                      <FileCheck size={16} />
                      신청 내용 확인하기
                    </Button>
                  </Link>
                  {/*{content.status === "completed" && (
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
                  )}*/}
                </ActionButtons>
              </CardContent>
            </ContentCard>
          ))}
        </ContentList>
      ) : (
        <EmptyState
          icon={<Clock size={64} />}
          title="진행 중인 신청이 없습니다"
          description="맞춤형 스타일링 컨텐츠를 신청해보세요."
          actionLink="/content-application"
          actionText="맞춤형 컨텐츠 신청하기"
        />
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
    </TabsContent>
  );
};

export default ProgressContent;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled(Input)`
  padding-right: 2.5rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContentCard = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #ff3e6c;
  }
`;

const CardHeaderSection = styled(CardHeader)`
  padding-bottom: 1rem;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ContentInfo = styled.div`
  flex: 1;
`;

const ContentTitle = styled(CardTitle)`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const ContentMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;

  @media (max-width: 640px) {
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

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
`;

const StatusBadge = styled(Badge)<{
  status: string
}>`
  background-color: ${(props) => {
    switch (props.status) {
      case "신청 접수":
        return "#f59e0b";
      case "에디터 배정":
        return "#8b5cf6";
      case "스타일링 제작":
        return "#3b82f6";
      case "검토 및 수정":
        return "#06b6d4";
      case "최종 완성":
        return "#10b981";
      case "취소됨":
        return "#ef4444";
      default:
        return "#f59e0b";
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.status) {
        case "pending":
          return "#d97706";
        case "assigned":
          return "#7c3aed";
        case "in-progress":
          return "#2563eb";
        case "review":
          return "#0891b2";
        case "completed":
          return "#059669";
        case "cancelled":
          return "#dc2626";
        default:
          return "#d97706";
      }
    }};
  }
`;

const ProgressSection = styled.div`
  margin: 1rem 0;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ProgressLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const ProgressValue = styled.span`
  color: #333;
  font-weight: 600;
`;

const ItemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ItemTag = styled(Badge)`
  background-color: rgba(255, 62, 108, 0.1);
  color: #ff3e6c;
  border: 1px solid rgba(255, 62, 108, 0.2);

  &:hover {
    background-color: rgba(255, 62, 108, 0.15);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TimelineSection = styled.div<{ isExpanded: boolean }>`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  opacity: ${(props) => (props.isExpanded ? "1" : "0")};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const TimelineTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimelineItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => (props.completed ? "#10b981" : "#666")};
`;

const TimelineIcon = styled.div<{ completed: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#10b981" : "#e5e7eb")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StarButton = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#fbbf24" : "#d1d5db")};
  transition: color 0.2s;

  &:hover {
    color: #fbbf24;
  }
`;

const FilterTabs = styled(TabsList)`
  background-color: white;
  border: 1px solid #e5e7eb;
`;
