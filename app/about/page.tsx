"use client";
import { useCallback } from "react";
import styled from "@emotion/styled";
import { Zap, Users, Sparkles, Heart } from "lucide-react";
import HeroSection from "@/src/widgets/about/HeroSection";
import FeatureSection from "@/src/widgets/about/FeatureSection";

function useSectionScroll() {
  return useCallback(() => {
    const sections = document.querySelectorAll("section");
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        currentScroll >= sectionTop - windowHeight / 2 &&
        currentScroll < sectionTop + sectionHeight - windowHeight / 2
      ) {
        currentSectionIndex = index;
      }
    });
    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex];
      const targetPosition = nextSection.offsetTop;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }, []);
}

export default function AboutPage() {
  const scrollToNext = useSectionScroll();

  return (
    <AboutContainer>
      <HeroSection onScrollNext={scrollToNext} />
      <FeatureSection
        bgColor="#fdf2f8"
        icon={<Zap size={60} />}
        imageSrc="/placeholder.svg?height=200&width=200&text=AI+Analysis"
        imageAlt="AI 체형 분석"
        title="AI 체형 분석"
        description={
          <>
            최신 AI 기술로 정확한 체형 분석을 통해 가장 잘 어울리는 스타일을 추천해드립니다.<br />
            사용자의 체형 데이터를 분석하여 체형의 특징을 파악하고, 이에 맞는 의류 스타일과 핏을 제안합니다.
          </>
        }
        onScrollNext={scrollToNext}
      />
      <FeatureSection
        bgColor="#fce7f3"
        icon={<Users size={60} />}
        imageSrc="/placeholder.svg?height=200&width=200&text=Professional+Stylist"
        imageAlt="전문 스타일리스트"
        title="전문 스타일리스트"
        description={
          <>
            경험 많은 전문 스타일리스트들이 개인의 취향과 라이프스타일을 고려한 맞춤 조언을 제공합니다.<br />
            패션 업계에서 다년간의 경력을 쌓은 스타일리스트들이 트렌드와 개인의 특성을 고려하여 최적의 스타일링 솔루션을 제안합니다.
          </>
        }
        onScrollNext={scrollToNext}
      />
      <FeatureSection
        bgColor="#fbcfe8"
        icon={<Sparkles size={60} />}
        imageSrc="/placeholder.svg?height=200&width=200&text=Custom+Curation"
        imageAlt="맞춤형 큐레이션"
        title="맞춤형 큐레이션"
        description={
          <>
            수천 개의 브랜드와 아이템 중에서 당신에게 딱 맞는 스타일을 큐레이션해드립니다.<br />
            사용자의 체형, 취향, 예산에 맞춰 최적의 의류 아이템을 선별하여 제안합니다.
          </>
        }
        onScrollNext={scrollToNext}
      />
      <FeatureSection
        bgColor="#f9a8d4"
        icon={<Heart size={60} />}
        imageSrc="/placeholder.svg?height=200&width=200&text=Continuous+Care"
        imageAlt="지속적인 관리"
        title="지속적인 관리"
        description={
          <>
            일회성이 아닌 지속적인 스타일 관리와 트렌드 업데이트로 항상 최신 패션을 유지합니다.<br />
            시즌별 트렌드 정보와 새로운 스타일링 제안을 통해 사용자의 패션 감각을 꾸준히 발전시켜 드립니다.
          </>
        }
        showScrollIndicator={false}
      />
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  width: 100%;
  background: #fafafa;
`;
