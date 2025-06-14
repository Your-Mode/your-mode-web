import styled from "@emotion/styled";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FloatingIconProps {
  top: string;
  left: string;
  delay: string;
  children: ReactNode;
}

export default function HeroSection({ onScrollNext }: { onScrollNext: () => void }) {
  return (
    <HeroSectionWrap>
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
        <FloatingIcon top="15%" left="10%" delay="0s">👗</FloatingIcon>
        <FloatingIcon top="25%" left="85%" delay="1s">👔</FloatingIcon>
        <FloatingIcon top="45%" left="5%" delay="2s">👠</FloatingIcon>
        <FloatingIcon top="35%" left="90%" delay="3s">👜</FloatingIcon>
        <FloatingIcon top="65%" left="15%" delay="4s">🕶️</FloatingIcon>
        <FloatingIcon top="70%" left="80%" delay="5s">⌚</FloatingIcon>
        <FloatingIcon top="80%" left="50%" delay="2.5s">💄</FloatingIcon>
      </FloatingIcons>
      <ScrollIndicator onClick={onScrollNext}>
        <ChevronDown size={32} />
      </ScrollIndicator>
    </HeroSectionWrap>
  );
}

// --- styled ---
const HeroSectionWrap = styled.section`
  min-height: 100vh;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
  background-image: linear-gradient(rgba(255, 107, 157, 0.8), rgba(196, 69, 105, 0.8)), url('/images/fashion-hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 768px) {
    min-height: 85vh;
    padding: 1rem 0.5rem;
  }
`;

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
`;

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
`;

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
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 1;
  @media (max-width: 768px) { display: none; }
`;

const FloatingIcon = styled.div<FloatingIconProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  color: white;
  animation: float 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

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
`;
