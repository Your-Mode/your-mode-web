"use client";

import styled from "@emotion/styled";
import FloatingButtons from "@/src/widgets/content/ui/FloatingButtons";
import { useHandleLike } from "@/src/widgets/content/feature/useHandleLike";
import Satisfaction from "@/src/widgets/content/ui/Satisfaction";
import Comments from "@/src/widgets/content/ui/Comments";
import RelatedContent from "@/src/widgets/content/ui/RelatedContent";
import Article from "@/src/widgets/content/ui/Article";
import BreadcrumbNavigation from "@/src/widgets/content/ui/BreadcrumbNavigation";

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const { isLiked, likeCount, handleLike } = useHandleLike();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainContainer>
      <MainContent>
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Article Section */}
        <Article likeCount={likeCount} />

        {/* Satisfaction Section */}
        <Satisfaction />

        {/* Related Content */}
        <RelatedContent />

        {/* Comments Section */}
        <Comments />

        {/* Floating Buttons */}
        <FloatingButtons isLiked={isLiked} scrollToTop={scrollToTop} handleLike={handleLike} />
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`;

const MainContent = styled.main`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;
