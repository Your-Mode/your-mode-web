"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  MessageCircleIcon as MessageCircle2,
  Edit,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const BreadcrumbContainer = styled.nav`
  margin-bottom: 2rem;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0;
  }
`

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 640px) {
    font-size: 0.75rem;
    flex-wrap: wrap;
  }
`

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BreadcrumbLink = styled(Link)`
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff3e6c;
  }
`

const BreadcrumbCurrent = styled.span`
  color: #333;
  font-weight: 500;
`

const ArticleContainer = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 3rem;
`

const ArticleHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 2rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ArticleTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  margin: 0;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const ArticleDate = styled.time`
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
`

const HeaderImageContainer = styled.div`
  position: relative;
  width: 280px;
  height: 160px;
  background-color: #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`

const LikeIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  background-color: #fbbf24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const MetaSection = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const BodyTypeBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const AuthorName = styled.span`
  color: #666;
  font-weight: 500;
  font-size: 0.875rem;
`

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
`

const MainImageContainer = styled.div`
  position: relative;
  height: 24rem;
  
  @media (min-width: 640px) {
    height: 32rem;
  }
`

const ArticleContent = styled.div`
  padding: 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`

const ContentText = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`

const ContentImageContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const ArticleFooter = styled.div`
  padding: 2rem;
  border-top: 1px solid #eaeaea;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    flex-direction: column;
    gap: 2rem;
  }
`

const FooterAuthorInfo = styled.div`
  text-align: left;
  
  p {
    color: #666;
    margin-bottom: 0.5rem;
    
    &:first-of-type {
      font-weight: 600;
      color: #333;
    }
  }
  
  @media (max-width: 640px) {
    p {
      font-size: 0.875rem;
    }
  }
`

const FooterBranding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  img {
    margin-bottom: 0.75rem;
  }
  
  p {
    font-size: 0.75rem;
    color: #666;
  }
  
  @media (max-width: 640px) {
    align-items: flex-start;
  }
`

const RelatedSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const RelatedCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

const RelatedCardContent = styled.div`
  padding: 1rem;
`

const RelatedTitle = styled.h3`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const RelatedMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
`

const RelatedStats = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
`

const SatisfactionSection = styled.div`
  padding: 1.5rem 2rem;
  background-color: #fafafa;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
  }
`

const SatisfactionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`

const SatisfactionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 640px) {
    gap: 1rem;
  }
`

const SatisfactionButton = styled.button<{ isSelected?: boolean; variant: "satisfied" | "unsatisfied" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  color: ${(props) => (props.isSelected ? (props.variant === "satisfied" ? "#10b981" : "#ef4444") : "#666")};
  
  &:hover {
    color: ${(props) => (props.variant === "satisfied" ? "#10b981" : "#ef4444")};
  }
  
  svg {
    color: inherit;
  }
  
  span {
    font-size: 0.875rem;
  }
`

const SatisfactionCount = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
`

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 50;
`

const FloatingButton = styled.button<{ variant?: "primary" | "secondary" }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.variant === "primary" ? "#ff3e6c" : "white")};
  color: ${(props) => (props.variant === "primary" ? "white" : "#666")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`

const CommentsSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const CommentsHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CommentsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`

const CommentsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const CommentItem = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.875rem;
`

const CommentDate = styled.span`
  color: #666;
  font-size: 0.75rem;
`

const CommentContent = styled.p`
  color: #333;
  line-height: 1.5;
  margin: 0;
`

const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const CommentActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    color: #333;
  }
`

const CommentForm = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eaeaea;
  background-color: #f9f9f9;
`

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #ff3e6c;
  }
`

const CommentSubmitButton = styled.button`
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #ff3e6c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e6356a;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const [isSatisfied, setIsSatisfied] = useState<boolean | null>(null)
  const [satisfactionCount, setSatisfactionCount] = useState(124)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(124)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "사용자1",
      content: "정말 유용한 정보네요! 감사합니다.",
      date: "2025년 06월 15일",
      isOwn: false,
    },
    {
      id: 2,
      author: "나",
      content: "저도 이런 스타일 좋아해요",
      date: "2025년 06월 16일",
      isOwn: true,
    },
  ])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")

  const handleSatisfaction = (satisfied: boolean) => {
    if (isSatisfied === satisfied) {
      setIsSatisfied(null)
      if (satisfied) setSatisfactionCount((prev) => prev - 1)
    } else {
      if (isSatisfied !== null && isSatisfied !== satisfied) {
        setSatisfactionCount((prev) => (satisfied ? prev + 1 : prev - 1))
      } else if (isSatisfied === null && satisfied) {
        setSatisfactionCount((prev) => prev + 1)
      }
      setIsSatisfied(satisfied)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "나",
        content: newComment,
        date: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isOwn: true,
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleEditComment = (id: number) => {
    const comment = comments.find((c) => c.id === id)
    if (comment) {
      setEditingComment(id)
      setEditContent(comment.content)
    }
  }

  const handleSaveEdit = (id: number) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, content: editContent } : c)))
    setEditingComment(null)
    setEditContent("")
  }

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id))
  }

  return (
    <MainContainer>
      <MainContent>
        {/* Breadcrumb Navigation */}
        <BreadcrumbContainer>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">유어모드 내일 로그</BreadcrumbLink>
              <ChevronRight size={14} />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contents">에디터 컨텐츠</BreadcrumbLink>
              <ChevronRight size={14} />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbCurrent>맞춤형 컨텐츠</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbContainer>

        <ArticleContainer>
          {/* Header with Title and Image */}
          <ArticleHeader>
            <HeaderContent>
              <ArticleTitle>컨텐츠 제목이 들어갈 자리라고 해야할까요?</ArticleTitle>
              <ArticleDate>2025년 06월 16일</ArticleDate>
            </HeaderContent>

            <HeaderImageContainer>
              <LikeIconContainer>
                <Heart size={24} color="#fff" fill="#fff" />
              </LikeIconContainer>
            </HeaderImageContainer>
          </ArticleHeader>

          {/* Meta Information */}
          <MetaSection>
            <AuthorInfo>
              <BodyTypeBadge>웨이브 체형</BodyTypeBadge>
              <AuthorName>에디터 김명현</AuthorName>
            </AuthorInfo>

            <ActionButtons>
              <ActionButton variant="ghost" size="sm">
                <Heart size={16} />
                <span>{likeCount}</span>
              </ActionButton>
              <ActionButton variant="ghost" size="sm">
                <MessageCircle size={16} />
                <span>23</span>
              </ActionButton>
              <ActionButton variant="ghost" size="sm">
                <Share2 size={16} />
              </ActionButton>
            </ActionButtons>
          </MetaSection>

          {/* Main Image */}
          <MainImageContainer>
            <Image src="/placeholder.svg?height=400&width=800" alt="Content main image" fill className="object-cover" />
          </MainImageContainer>

          {/* Content */}
          <ArticleContent>
            <ContentText>
              <p>
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
              </p>

              <ContentImageContainer>
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Content image"
                  width={600}
                  height={300}
                  className="rounded-lg"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </ContentImageContainer>

              <p>
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
                컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
              </p>
            </ContentText>
          </ArticleContent>

          {/* Footer */}
          <ArticleFooter>
            <FooterAuthorInfo>
              <p>에디터 김명현</p>
              <p>전문적인 패션 스타일링 경험을 공유합니다.</p>
              <p>문의는 모든 내용을 겉에서 봐야하는 경우가 많다.</p>
            </FooterAuthorInfo>

            <FooterBranding>
              <Image src="/placeholder.svg?height=40&width=120" alt="유어모드 로고" width={120} height={40} />
              <p>유어모드는 무단 전재와 재배포를 금지하고 있습니다</p>
              <p>© 2025 유어모드</p>
            </FooterBranding>
          </ArticleFooter>
        </ArticleContainer>

        {/* Satisfaction Section */}
        <SatisfactionSection>
          <SatisfactionTitle>컨텐츠가 만족스러우셨나요?</SatisfactionTitle>
          <SatisfactionButtons>
            <SatisfactionButton
              variant="satisfied"
              isSelected={isSatisfied === true}
              onClick={() => handleSatisfaction(true)}
            >
              <ThumbsUp size={20} />
              <span>만족스러워요</span>
            </SatisfactionButton>
            <SatisfactionButton
              variant="unsatisfied"
              isSelected={isSatisfied === false}
              onClick={() => handleSatisfaction(false)}
            >
              <ThumbsDown size={20} />
              <span>불만족스러워요</span>
            </SatisfactionButton>
          </SatisfactionButtons>
        </SatisfactionSection>

        {/* Related Content */}
        <RelatedSection>
          <SectionTitle>컨텐츠 둘러보기</SectionTitle>
          <RelatedGrid>
            {[1, 2, 3, 4].map((i) => (
              <RelatedCard key={i}>
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt={`Related content ${i}`}
                  width={200}
                  height={150}
                  style={{ width: "100%", height: "8rem", objectFit: "cover" }}
                />
                <RelatedCardContent>
                  <RelatedTitle>유어모드 컨텐츠 대단하다테스트튜토리얼 웹 컨텐츠 내용 자유롭게</RelatedTitle>
                  <RelatedMeta>
                    <span>2025년 4월 16일</span>
                  </RelatedMeta>
                  <RelatedStats>
                    <span>좋아요 수</span>
                    <span>댓글 수</span>
                  </RelatedStats>
                </RelatedCardContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedSection>

        {/* Comments Section */}
        <CommentsSection>
          <CommentsHeader>
            <CommentsTitle>댓글 {comments.length}개</CommentsTitle>
            <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
              <MessageCircle2 size={16} />
              {showComments ? "댓글 닫기" : "댓글 열기"}
            </Button>
          </CommentsHeader>

          {showComments && (
            <>
              <CommentsList>
                {comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <CommentHeader>
                      <div>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentDate> • {comment.date}</CommentDate>
                      </div>
                      {comment.isOwn && (
                        <CommentActions>
                          <CommentActionButton onClick={() => handleEditComment(comment.id)}>
                            <Edit size={12} />
                          </CommentActionButton>
                          <CommentActionButton onClick={() => handleDeleteComment(comment.id)}>
                            <Trash2 size={12} />
                          </CommentActionButton>
                        </CommentActions>
                      )}
                    </CommentHeader>
                    {editingComment === comment.id ? (
                      <div>
                        <CommentTextarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                        <div style={{ marginTop: "0.5rem" }}>
                          <CommentSubmitButton onClick={() => handleSaveEdit(comment.id)}>저장</CommentSubmitButton>
                          <CommentActionButton onClick={() => setEditingComment(null)}>취소</CommentActionButton>
                        </div>
                      </div>
                    ) : (
                      <CommentContent>{comment.content}</CommentContent>
                    )}
                  </CommentItem>
                ))}
              </CommentsList>

              <CommentForm>
                <CommentTextarea
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentSubmitButton onClick={handleAddComment} disabled={!newComment.trim()}>
                  댓글 달기
                </CommentSubmitButton>
              </CommentForm>
            </>
          )}
        </CommentsSection>

        {/* Floating Buttons */}
        <FloatingButtons>
          <FloatingButton variant="primary" onClick={handleLike}>
            <Heart size={20} fill={isLiked ? "white" : "none"} />
          </FloatingButton>
          <FloatingButton onClick={scrollToTop}>
            <ArrowUp size={20} />
          </FloatingButton>
        </FloatingButtons>
      </MainContent>
    </MainContainer>
  )
}
