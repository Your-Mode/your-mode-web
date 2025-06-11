"use client"

import { useState } from "react"
import ContentCard from "@/src/widgets/content/ui/content-card-vertical"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const ProfileContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem 2rem 1rem;
  }
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const ProfileInfo = styled.div`
  h1 {
    font-family: 'Pretendard', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #333;
    
    @media (max-width: 640px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    color: #666;
    margin-bottom: 0.25rem;
  }
`

const EditButton = styled(Button)`
  @media (max-width: 640px) {
    width: 100%;
  }
`

const StyledTabs = styled(Tabs)`
  .tabs-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const MyContentSection = styled.div`
  margin-top: 1.5rem;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const SectionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`

export default function YourModePage() {
  const [activeTab, setActiveTab] = useState("favorites")

  const userContent = [
    {
      id: "user-1",
      title: "나만의 스타일링 가이드 1",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "웨이브",
      likes: 45,
      comments: 8,
      date: "2025년 06월 10일",
    },
    {
      id: "user-2",
      title: "개인 맞춤 코디 추천",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "웨이브",
      likes: 32,
      comments: 5,
      date: "2025년 06월 08일",
    },
    {
      id: "user-3",
      title: "여름 휴가 스타일링",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "내추럴",
      likes: 28,
      comments: 4,
      date: "2025년 06월 06일",
    },
    {
      id: "user-4",
      title: "오피스 룩 가이드",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "스트레이트",
      likes: 35,
      comments: 7,
      date: "2025년 06월 04일",
    },
    {
      id: "user-5",
      title: "데이트 룩 추천",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "웨이브",
      likes: 42,
      comments: 9,
      date: "2025년 06월 02일",
    },
    {
      id: "user-6",
      title: "캐주얼 스타일링 팁",
      image: "/placeholder.svg?height=200&width=300",
      bodyType: "내추럴",
      likes: 38,
      comments: 6,
      date: "2025년 05월 30일",
    },
  ]

  return (
    <MainContainer>
      <MainContent>
        <ProfileContainer>
          <ProfileHeader>
            <ProfileInfo>
              <h1>마이페이지</h1>
              <p>이름: 김정윤</p>
              <p>체형: 웨이브</p>
            </ProfileInfo>
            <EditButton variant="outline">회원정보 수정</EditButton>
          </ProfileHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="tabs-list">
              <TabsTrigger value="favorites">찜한 컨텐츠</TabsTrigger>
              <TabsTrigger value="recent">최근 본 컨텐츠</TabsTrigger>
              <TabsTrigger value="comments">댓글 단 컨텐츠</TabsTrigger>
              <TabsTrigger value="my-content">나만의 컨텐츠</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              <ContentGrid>
                {userContent.map((content) => (
                  <ContentCard key={content.id} {...content} isLiked={true} />
                ))}
              </ContentGrid>
            </TabsContent>

            <TabsContent value="recent">
              <ContentGrid>
                {userContent.map((content) => (
                  <ContentCard key={content.id} {...content} />
                ))}
              </ContentGrid>
            </TabsContent>

            <TabsContent value="comments">
              <ContentGrid>
                {userContent.slice(0, 3).map((content) => (
                  <ContentCard key={content.id} {...content} />
                ))}
              </ContentGrid>
            </TabsContent>

            <TabsContent value="my-content">
              <MyContentSection>
                <SectionHeader>
                  <SectionTitle>나만의 컨텐츠 목록</SectionTitle>
                  <Button>결과 페이지 조회</Button>
                </SectionHeader>
                <ContentGrid>
                  {userContent.map((content) => (
                    <ContentCard key={content.id} {...content} />
                  ))}
                </ContentGrid>
              </MyContentSection>
            </TabsContent>
          </Tabs>
        </ProfileContainer>
      </MainContent>
    </MainContainer>
  )
}
