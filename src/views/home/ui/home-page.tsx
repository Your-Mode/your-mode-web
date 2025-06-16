"use client";

import HeroCarousel from "@/src/widgets/home/ui/HeroCarousel";
import styled from "@emotion/styled";
import { customContents, editorContents, trendingContents } from "@/src/shared/api/mock";
import HomeContentSection from "@/src/widgets/home/ui/HomeContentSection";

export default function HomePage() {
  return (
    <MainContainer>
      <HeroCarousel />
      <MainContent>
        <HomeContentSection title="상단 컨텐츠 목록" contents={trendingContents} />
        <HomeContentSection title="에디터 컨텐츠 목록" contents={editorContents} moreLink="editor-contents" />
        <HomeContentSection title="맞춤형 컨텐츠 목록" contents={customContents} moreLink="contents" />
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;
