"use client"

import styled from "@emotion/styled"
import HeroCarousel from "@/src/widgets/hero-carousel/ui/hero-carousel"
import ContentCard from "@/src/widgets/content/ui/entity-content-card"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
`

const SectionContainer = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
  
  @media (max-width: 640px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`

export default function HomePage() {
  const featuredContent = [
    {
      id: "1",
      title: "컨텐츠 제목이 들어갈 자리라고 해야할까요?",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 124,
      comments: 23,
      date: "2025년 06월 16일",
      createdAt: new Date("2025-06-16"),
    },
    {
      id: "2",
      title: "스타일링 가이드: 내추럴 체형을 위한 룩북",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 89,
      comments: 15,
      date: "2025년 06월 15일",
      createdAt: new Date("2025-06-15"),
    },
    {
      id: "3",
      title: "스트레이트 체형 완벽 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 156,
      comments: 32,
      date: "2025년 06월 14일",
      createdAt: new Date("2025-06-14"),
    },
    {
      id: "4",
      title: "전문 에디터의 스타일링 노하우",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 200,
      comments: 45,
      date: "2025년 06월 13일",
      createdAt: new Date("2025-06-13"),
    },
  ]

  const editorContent = [
    {
      id: "5",
      title: "트렌드 분석: 2025 봄 패션",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 178,
      comments: 38,
      date: "2025년 06월 12일",
      createdAt: new Date("2025-06-12"),
    },
    {
      id: "6",
      title: "나만을 위한 맞춤 스타일링",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 67,
      comments: 12,
      date: "2025년 06월 11일",
      createdAt: new Date("2025-06-11"),
    },
    {
      id: "7",
      title: "웨이브 체형을 위한 여름 코디",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 142,
      comments: 28,
      date: "2025년 06월 10일",
      createdAt: new Date("2025-06-10"),
    },
    {
      id: "8",
      title: "내추럴 체형의 오피스 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 112,
      comments: 19,
      date: "2025년 06월 09일",
      createdAt: new Date("2025-06-09"),
    },
  ]

  const customContent = [
    {
      id: "9",
      title: "스트레이트 체형을 위한 데일리 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 98,
      comments: 21,
      date: "2025년 06월 08일",
      createdAt: new Date("2025-06-08"),
    },
    {
      id: "10",
      title: "여름 휴가를 위한 리조트 룩",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "웨이브",
      likes: 165,
      comments: 33,
      date: "2025년 06월 07일",
      createdAt: new Date("2025-06-07"),
    },
    {
      id: "11",
      title: "가을 시즌 트렌드 컬러 활용법",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "내추럴",
      likes: 132,
      comments: 27,
      date: "2025년 06월 06일",
      createdAt: new Date("2025-06-06"),
    },
    {
      id: "12",
      title: "겨울 아우터 스타일링 가이드",
      image: "/placeholder.svg?height=240&width=220",
      bodyType: "스트레이트",
      likes: 187,
      comments: 41,
      date: "2025년 06월 05일",
      createdAt: new Date("2025-06-05"),
    },
  ]

  return (
    <MainContainer>
      <MainContent>
        <HeroCarousel />

        <SectionContainer>
          <SectionTitle>상단 컨텐츠 목록</SectionTitle>
          <ContentGrid>
            {featuredContent.map((content) => (
              <ContentCard key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>에디터 컨텐츠 목록</SectionTitle>
          <ContentGrid>
            {editorContent.map((content) => (
              <ContentCard key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>맞춤형 컨텐츠 목록</SectionTitle>
          <ContentGrid>
            {customContent.map((content) => (
              <ContentCard key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>
      </MainContent>
    </MainContainer>
  )
}
