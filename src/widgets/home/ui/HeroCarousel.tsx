"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides, useHandleCarousel } from "@/src/widgets/home/feature/hooks/useHandleCarousel";

export default function HeroCarousel() {
  const { slideDirection, currentSlide, goToNextSlide, goToPrevSlide, handleIndicatorClick } = useHandleCarousel();

  return (
    <HeroSection>
      <HeroBanner>
        <SlideContainer currentSlide={currentSlide}>
          {slides.map((slide, index) => (
            <Slide key={index} backgroundImage={slide.backgroundImage}>
              <HeroContent slideDirection={slideDirection} isActive={index === currentSlide}>
                <HeroTitle>{slide.title}</HeroTitle>
                <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
                <Link href={slide.link}>
                  <HeroButton>{slide.buttonText}</HeroButton>
                </Link>
              </HeroContent>
            </Slide>
          ))}
        </SlideContainer>

        <NavigationButton direction="left" onClick={goToPrevSlide} aria-label="이전 슬라이드">
          <ChevronLeft size={20} />
        </NavigationButton>
        <NavigationButton direction="right" onClick={goToNextSlide} aria-label="다음 슬라이드">
          <ChevronRight size={20} />
        </NavigationButton>

        <CarouselIndicators>
          {slides.map((_, index) => (
            <Indicator key={index} active={index === currentSlide} onClick={() => handleIndicatorClick(index)} />
          ))}
        </CarouselIndicators>
      </HeroBanner>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  margin-bottom: 3rem;
`;

const HeroBanner = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const SlideContainer = styled.div<{ currentSlide: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  transform: translateX(-${({ currentSlide }) => currentSlide * 100}%);
  transition: transform 0.8s ease-in-out;
`;

const Slide = styled.div<{ backgroundImage: string }>`
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('${(props) => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
`;

const HeroContent = styled.div<{ slideDirection: number; isActive: boolean }>`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  z-index: 2;
  padding: 0 1rem;
  position: relative;
  width: 100%;
  max-width: 800px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: translateX(${({ slideDirection, isActive }) => (isActive ? 0 : slideDirection * 100)}px);
  transition: all 0.8s ease-out;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 0.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 0.5rem;
  letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.wide};
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
    margin-bottom: 0.3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  margin-bottom: 2rem;
  opacity: 0.9;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    margin-bottom: 1rem;
  }
`;

const HeroButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 6px;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: ${({ theme }) => theme.fonts.size.base};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow.dark};
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: ${({ theme }) => theme.fonts.size.xs};
  }
`;

const NavigationButton = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.background.overlay};
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.inverse};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    left: ${(props) => (props.direction === "left" ? "0.5rem" : "auto")};
    right: ${(props) => (props.direction === "right" ? "0.5rem" : "auto")};
  }

  @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
  }
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;

  @media (max-width: 480px) {
    bottom: 0.8rem;
    gap: 0.3rem;
  }
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => (active ? theme.colors.text.primary : "rgba(0, 0, 0, 0.3)")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.primary};
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;
