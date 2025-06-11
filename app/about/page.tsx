"use client"

import { useEffect } from "react"
import styled from "@emotion/styled"
import { ArrowRight, ChevronDown, Zap, Users, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

const AboutContainer = styled.div`
  width: 100%;
  background: #fafafa;
`

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  
  @media (max-width: 768px) {
    min-height: 90vh;
    padding: 1rem;
    justify-content: center;
  }
`

const HeroSection = styled(Section)`
  text-align: center;
  position: relative;
  z-index: 2;
  background-image: linear-gradient(rgba(255, 107, 157, 0.8), rgba(196, 69, 105, 0.8)), url('/images/fashion-hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: 768px) {
    min-height: 85vh;
    padding: 1rem 0.5rem;
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    line-height: 1.4;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
    padding: 0.5rem;
  }
`

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #ff6b9d;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 5;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    gap: 0.3rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const FloatingIcon = styled.div<{ top: string; left: string; delay: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: float 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  color: white;
  cursor: pointer;
  z-index: 5;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-20px) translateX(-50%); }
    60% { transform: translateY(-10px) translateX(-50%); }
  }
  
  @media (max-width: 768px) {
    bottom: 0.5rem;
  }
`

const FeatureSection = styled(Section)<{ bgColor: string }>`
  background: ${(props) => props.bgColor};
  text-align: center;
  
  @media (max-width: 768px) {
    min-height: 80vh;
    padding: 1rem 0.5rem;
  }
`

const FeatureContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`

const FeatureImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-bottom: 0.8rem;
  }
`

const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
`

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`

const FeatureIcon = styled.div`
  color: white;
  z-index: 2;
  position: relative;
  
  @media (max-width: 768px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
  
  @media (max-width: 480px) {
    svg {
      width: 35px;
      height: 35px;
    }
  }
`

const FeatureScrollIndicator = styled(ScrollIndicator)`
  color: #333;
`

export default function AboutPage() {
  const scrollToNext = () => {
    // 현재 섹션을 찾기 위해 모든 섹션의 위치를 확인
    const sections = document.querySelectorAll("section")
    const currentScroll = window.scrollY
    const windowHeight = window.innerHeight

    let currentSectionIndex = 0

    // 현재 보고 있는 섹션 찾기
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (
        currentScroll >= sectionTop - windowHeight / 2 &&
        currentScroll < sectionTop + sectionHeight - windowHeight / 2
      ) {
        currentSectionIndex = index
      }
    })

    // 다음 섹션으로 스크롤
    const nextSectionIndex = currentSectionIndex + 1
    if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex]
      const targetPosition = nextSection.offsetTop

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    // 스크롤 스냅 관련 코드 제거 - 빈 useEffect 또는 완전히 제거
  }, [])

  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle>
          당신만의 스타일을
          <br />
          찾아드립니다
        </HeroTitle>
        <HeroSubtitle>
          AI 기반 체형 분석과 전문 스타일리스트의 노하우로
          <br />
          완벽한 패션 솔루션을 제공합니다
        </HeroSubtitle>
        <CTAButton href="/content-application">
          컨텐츠 신청하기
          <ArrowRight size={16} />
        </CTAButton>

        <FloatingIcons>
          <FloatingIcon top="15%" left="10%" delay="0s">
            👗
          </FloatingIcon>
          <FloatingIcon top="25%" left="85%" delay="1s">
            👔
          </FloatingIcon>
          <FloatingIcon top="45%" left="5%" delay="2s">
            👠
          </FloatingIcon>
          <FloatingIcon top="35%" left="90%" delay="3s">
            👜
          </FloatingIcon>
          <FloatingIcon top="65%" left="15%" delay="4s">
            🕶️
          </FloatingIcon>
          <FloatingIcon top="70%" left="80%" delay="5s">
            ⌚
          </FloatingIcon>
          <FloatingIcon top="80%" left="50%" delay="2.5s">
            💄
          </FloatingIcon>
        </FloatingIcons>

        <ScrollIndicator onClick={scrollToNext}>
          <ChevronDown size={32} />
        </ScrollIndicator>
      </HeroSection>

      <FeatureSection bgColor="#fdf2f8">
        <FeatureContent>
          <FeatureImageContainer>
            <FeatureIcon>
              <Zap size={60} />
            </FeatureIcon>
            <PlaceholderImage
              src="/placeholder.svg?height=200&width=200&text=AI+Analysis"
              alt="AI 체형 분석"
              style={{ position: "absolute", opacity: 0.3 }}
            />
          </FeatureImageContainer>
          <FeatureTitle>AI 체형 분석</FeatureTitle>
          <FeatureDescription>
            최신 AI 기술로 정확한 체형 분석을 통해 가장 잘 어울리는 스타일을 추천해드립니다. 사용자의 체형 데이터를
            분석하여 체형의 특징을 파악하고, 이에 맞는 의류 스타일과 핏을 제안합니다.
          </FeatureDescription>
        </FeatureContent>

        <FeatureScrollIndicator onClick={scrollToNext}>
          <ChevronDown size={32} />
        </FeatureScrollIndicator>
      </FeatureSection>

      <FeatureSection bgColor="#fce7f3">
        <FeatureContent>
          <FeatureImageContainer>
            <FeatureIcon>
              <Users size={60} />
            </FeatureIcon>
            <PlaceholderImage
              src="/placeholder.svg?height=200&width=200&text=Professional+Stylist"
              alt="전문 스타일리스트"
              style={{ position: "absolute", opacity: 0.3 }}
            />
          </FeatureImageContainer>
          <FeatureTitle>전문 스타일리스트</FeatureTitle>
          <FeatureDescription>
            경험 많은 전문 스타일리스트들이 개인의 취향과 라이프스타일을 고려한 맞춤 조언을 제공합니다. 패션 업계에서
            다년간의 경력을 쌓은 스타일리스트들이 트렌드와 개인의 특성을 고려하여 최적의 스타일링 솔루션을 제안합니다.
          </FeatureDescription>
        </FeatureContent>

        <FeatureScrollIndicator onClick={scrollToNext}>
          <ChevronDown size={32} />
        </FeatureScrollIndicator>
      </FeatureSection>

      <FeatureSection bgColor="#fbcfe8">
        <FeatureContent>
          <FeatureImageContainer>
            <FeatureIcon>
              <Sparkles size={60} />
            </FeatureIcon>
            <PlaceholderImage
              src="/placeholder.svg?height=200&width=200&text=Custom+Curation"
              alt="맞춤형 큐레이션"
              style={{ position: "absolute", opacity: 0.3 }}
            />
          </FeatureImageContainer>
          <FeatureTitle>맞춤형 큐레이션</FeatureTitle>
          <FeatureDescription>
            수천 개의 브랜드와 아이템 중에서 당신에게 딱 맞는 스타일을 큐레이션해드립니다. 사용자의 체형, 취향, 예산에
            맞춰 최적의 의류 아이템을 선별하여 제안합니다.
          </FeatureDescription>
        </FeatureContent>

        <FeatureScrollIndicator onClick={scrollToNext}>
          <ChevronDown size={32} />
        </FeatureScrollIndicator>
      </FeatureSection>

      <FeatureSection bgColor="#f9a8d4">
        <FeatureContent>
          <FeatureImageContainer>
            <FeatureIcon>
              <Heart size={60} />
            </FeatureIcon>
            <PlaceholderImage
              src="/placeholder.svg?height=200&width=200&text=Continuous+Care"
              alt="지속적인 관리"
              style={{ position: "absolute", opacity: 0.3 }}
            />
          </FeatureImageContainer>
          <FeatureTitle>지속적인 관리</FeatureTitle>
          <FeatureDescription>
            일회성이 아닌 지속적인 스타일 관리와 트렌드 업데이트로 항상 최신 패션을 유지합니다. 시즌별 트렌드 정보와
            새로운 스타일링 제안을 통해 사용자의 패션 감각을 꾸준히 발전시켜 드립니다.
          </FeatureDescription>
        </FeatureContent>
      </FeatureSection>
    </AboutContainer>
  )
}
