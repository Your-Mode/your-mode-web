"use client"

import HeroCarousel from "@/src/widgets/hero-carousel/ui/hero-carousel"
import ContentCardWide from "@/src/widgets/content/ui/content-card-wide"
import styled from "@emotion/styled"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const SectionContainer = styled.section`
  margin-bottom: 4rem;
  margin-top: 3rem;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
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
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export default function HomePage() {
  const trendingContent = [
    {
      id: "1",
      title: "전문 에디터의 스타일링 노하우",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "웨이브",
      likes: 200,
      comments: 45,
      date: "2025년 06월 16일",
    },
    {
      id: "2",
      title: "트렌드 분석: 2025 봄 패션",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "내추럴",
      likes: 178,
      comments: 38,
      date: "2025년 06월 15일",
    },
    {
      id: "3",
      title: "스트레이트 체형을 위한 데일리 룩",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "스트레이트",
      likes: 156,
      comments: 32,
      date: "2025년 06월 14일",
    },
    {
      id: "4",
      title: "2025 S/S 컬러 트렌드 가이드",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "웨이브",
      likes: 142,
      comments: 28,
      date: "2025년 06월 13일",
    },
  ]

  const editorContent = [
    {
      id: "5",
      title: "미니멀리즘의 귀환: 심플한 스타일링",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "내추럴",
      likes: 112,
      comments: 19,
      date: "2025년 06월 12일",
    },
    {
      id: "6",
      title: "오버사이즈 코트의 계절별 활용법",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "스트레이트",
      likes: 98,
      comments: 21,
      date: "2025년 06월 11일",
    },
    {
      id: "7",
      title: "웨이브 체형을 위한 액세서리 매칭",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "웨이브",
      likes: 87,
      comments: 16,
      date: "2025년 06월 10일",
    },
    {
      id: "8",
      title: "내추럴 체형의 캐주얼 스타일링",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "내추럴",
      likes: 76,
      comments: 14,
      date: "2025년 06월 09일",
    },
  ]

  const customContent = [
    {
      id: "9",
      title: "당신만을 위한 맞춤 스타일링 가이드",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "웨이브",
      likes: 245,
      comments: 52,
      date: "2025년 06월 18일",
    },
    {
      id: "10",
      title: "체형별 완벽한 데님 스타일링",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "스트레이트",
      likes: 189,
      comments: 41,
      date: "2025년 06월 17일",
    },
    {
      id: "11",
      title: "개인 맞춤형 컬러 팔레트 추천",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "내추럴",
      likes: 167,
      comments: 35,
      date: "2025년 06월 16일",
    },
    {
      id: "12",
      title: "계절별 레이어링 완벽 가이드",
      image: "/placeholder.svg?height=120&width=280",
      bodyType: "스트레이트",
      likes: 134,
      comments: 29,
      date: "2025년 06월 15일",
    },
  ]

  return (
    <MainContainer>
      <HeroCarousel />
      <MainContent>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>상단 컨텐츠 목록</SectionTitle>
            <ViewAllLink href="/contents">
              더 보기 <ArrowRight size={16} />
            </ViewAllLink>
          </SectionHeader>
          <ContentGrid>
            {trendingContent.map((content) => (
              <ContentCardWide key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>에디터 컨텐츠 목록</SectionTitle>
            <ViewAllLink href="/editor-contents">
              더 보기 <ArrowRight size={16} />
            </ViewAllLink>
          </SectionHeader>
          <ContentGrid>
            {editorContent.map((content) => (
              <ContentCardWide key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>맞춤형 컨텐츠 목록</SectionTitle>
            <ViewAllLink href="/contents?type=custom">
              더 보기 <ArrowRight size={16} />
            </ViewAllLink>
          </SectionHeader>
          <ContentGrid>
            {customContent.map((content) => (
              <ContentCardWide key={content.id} {...content} />
            ))}
          </ContentGrid>
        </SectionContainer>
      </MainContent>
    </MainContainer>
  )
}
