"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/src/shared/components/ui/tabs";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Progress } from "@/src/shared/components/ui/progress";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Label } from "@/src/shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription, DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  Eye,
  ArrowRight,
  FileCheck,
  MessageSquare,
  Star,
} from "lucide-react";
import Link from "next/link";
import { FileText, Clock, User, CheckCircle, AlertCircle, Calendar, Tag, Search } from "lucide-react";
import ProfileHeader from "@/src/widgets/mypage/ui/profile-header";
import ContentTabs from "@/src/widgets/mypage/ui/content-tabs";
import ContentGrid from "@/src/widgets/mypage/ui/content-grid";
import EmptyState from "@/src/widgets/mypage/ui/empty-state";
import ContentCardComponent from "@/src/widgets/content/ui/content-card";
import styled from "@emotion/styled";
import {
  bodyAnalysisResult,
  commentedContents,
  favorites,
  myCustomContents,
  recentViewed,
} from "@/src/shared/api/mock";
import { ContentStatus } from "@/src/shared/types/content";

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.75rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

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
  status: "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"
}>`
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#f59e0b";
      case "assigned":
        return "#8b5cf6";
      case "in-progress":
        return "#3b82f6";
      case "review":
        return "#06b6d4";
      case "completed":
        return "#10b981";
      case "cancelled":
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

const ThankYouDialog = styled(Dialog)`
  .dialog-content {
    text-align: center;
  }
`;

// 체형분석 결과 관련 스타일
const BodyAnalysisCard = styled(Card)`
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  border: 1px solid #f9a8d4;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(244, 114, 182, 0.15);
  }
`;

const BodyTypeIcon = styled.div<{ gradient: string }>`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: ${(props) =>
    props.gradient === "from-emerald-400 to-teal-500"
      ? "linear-gradient(to bottom right, #34d399, #14b8a6)"
      : props.gradient === "from-blue-400 to-indigo-500"
        ? "linear-gradient(to bottom right, #60a5fa, #6366f1)"
        : "linear-gradient(to bottom right, #fb7185, #ec4899)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const BodyTypeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const BodyTypeDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1rem;
`;

const AnalysisDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.75rem;
  margin-bottom: 1rem;
`;

const ViewResultButton = styled(Button)`
  width: 100%;
  background: linear-gradient(to right, #f472b6, #ec4899);
  color: white;
  border: none;

  &:hover {
    background: linear-gradient(to right, #ec4899, #db2777);
  }
`;

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("my-content");
  const [activeCustomTab, setActiveCustomTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [expandedTimelines, setExpandedTimelines] = useState<Set<string>>(new Set());

  // 샘플 데이터
  const userProfile = {
    name: "김정윤",
    bodyType: "웨이브",
    email: "yourmode@naver.com",
    stats: {
      customContents: 3,
      favorites: 5,
      comments: 2,
    },
  };

  const completedContents = myCustomContents.filter((content) => content.status === "completed");

  const getStatusText = (status: ContentStatus) => {
    switch (status) {
      case "pending":
        return "접수 완료";
      case "assigned":
        return "에디터 배정";
      case "in-progress":
        return "제작 중";
      case "review":
        return "검토 중";
      case "completed":
        return "완료";
      case "cancelled":
        return "취소됨";
      default:
        return "접수 완료";
    }
  };

  const getStatusIcon = (status: ContentStatus) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "assigned":
        return <User size={14} />;
      case "in-progress":
        return <FileText size={14} />;
      case "review":
        return <AlertCircle size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "cancelled":
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

  return (
    <MainContainer>
      <MainContent>
        {/* 프로필 헤더 */}
        <ProfileHeader
          name={userProfile.name}
          bodyType={userProfile.bodyType}
          email={userProfile.email}
          stats={userProfile.stats}
        />

        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {/* 나만의 컨텐츠 */}
            <TabsContent value="my-content">
              {completedContents.length > 0 ? (
                <ContentGrid>
                  {completedContents.map((content) => (
                    <ContentCardComponent
                      key={content.id}
                      id={content.id}
                      title={content.title}
                      type="맞춤형 컨텐츠"
                      isCompleted={true}
                      completedText={`완료됨 · ${content.applicationDate}`}
                      editorName={content.editorName}
                      items={content.items}
                      iconType="view"
                    />
                  ))}
                </ContentGrid>
              ) : (
                <EmptyState
                  icon={<FileText size={64} />}
                  title="아직 완료된 맞춤형 컨텐츠가 없습니다"
                  description="신청한 컨텐츠가 완료되면 여기에서 확인할 수 있습니다."
                  actionLink="/content-application"
                  actionText="맞춤형 컨텐츠 신청하기"
                />
              )}
            </TabsContent>

            {/* 진행 상황 */}
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

                        <TimelineSection isExpanded={expandedTimelines.has(content.id)}>
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
                          <Button variant="outline" size="sm" onClick={() => toggleTimeline(content.id)}>
                            {expandedTimelines.has(content.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            진행 단계 확인
                          </Button>
                          <Link href={`/mypage/detail/${content.id}`}>
                            <Button variant="outline" size="sm">
                              <FileCheck size={16} />
                              신청 내용 확인하기
                            </Button>
                          </Link>
                          {content.status === "completed" && (
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
                          )}
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

            {/* 찜한 컨텐츠 */}
            <TabsContent value="favorites">
              <ContentGrid>
                {favorites.map((fav) => (
                  <ContentCardComponent
                    key={fav.id}
                    id={fav.id}
                    title={fav.title}
                    type={`${fav.bodyType} 체형`}
                    date={fav.date}
                    likes={fav.likes}
                    comments={fav.comments}
                    isLiked={fav.isLiked}
                    iconType="like"
                  />
                ))}
              </ContentGrid>
            </TabsContent>

            {/* 댓글 단 컨텐츠 */}
            <TabsContent value="comments">
              <ContentGrid>
                {commentedContents.map((content) => (
                  <ContentCardComponent
                    key={content.id}
                    id={content.id}
                    title={content.title}
                    type={`${content.bodyType} 체형`}
                    date={content.date}
                    likes={content.likes}
                    comments={content.comments}
                    myComment={content.myComment}
                    iconType="comment"
                  />
                ))}
              </ContentGrid>
            </TabsContent>

            {/* 최근 본 컨텐츠 */}
            <TabsContent value="recent">
              <ContentGrid>
                {recentViewed.map((content) => (
                  <ContentCardComponent
                    key={content.id}
                    id={content.id}
                    title={content.title}
                    type={`${content.bodyType} 체형`}
                    date={content.date}
                    likes={content.likes}
                    comments={content.comments}
                    iconType="view"
                  />
                ))}
              </ContentGrid>
            </TabsContent>

            {/* 체형분석 결과 */}
            <TabsContent value="body-analysis">
              <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
                <BodyAnalysisCard style={{ maxWidth: "400px", width: "100%" }}>
                  <CardContent style={{ padding: "2rem", textAlign: "center" }}>
                    <BodyTypeIcon gradient={bodyAnalysisResult.gradient}>
                      <Target size={32} color="white" />
                    </BodyTypeIcon>

                    <BodyTypeTitle>{bodyAnalysisResult.title}</BodyTypeTitle>

                    <AnalysisDate>
                      <Calendar size={14} />
                      분석일: {bodyAnalysisResult.analysisDate}
                    </AnalysisDate>

                    <BodyTypeDescription>{bodyAnalysisResult.description}</BodyTypeDescription>

                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                      <Link href="/body-analysis/result" style={{ flex: 1 }}>
                        <ViewResultButton>
                          <Eye size={16} style={{ marginRight: "0.5rem" }} />
                          상세 결과 보기
                        </ViewResultButton>
                      </Link>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href="/body-analysis" style={{ flex: 1 }}>
                        <Button variant="outline" style={{ width: "100%" }}>
                          <Sparkles size={16} style={{ marginRight: "0.5rem" }} />
                          다시 진단하기
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </BodyAnalysisCard>
              </div>
            </TabsContent>
          </ContentTabs>
        </Tabs>

        {/* 감사 메시지 모달 */}
        <ThankYouDialog open={thankYouModalOpen} onOpenChange={setThankYouModalOpen}>
          <DialogContent className="sm:max-w-[400px] text-center">
            <div>
              <h4 className="text-center">감사합니다! 🎉</h4>
              <p className="text-center">
                소중한 후기를 작성해주셔서 감사합니다.
                <br />더 나은 서비스를 제공하는데 큰 도움이 됩니다.
              </p>
            </div>
            <DialogFooter className="justify-center">
              <Button onClick={() => setThankYouModalOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </ThankYouDialog>
      </MainContent>
    </MainContainer>
  );
}

const FilterTabs = styled(TabsList)`
  background-color: white;
  border: 1px solid #e5e7eb;
`;
