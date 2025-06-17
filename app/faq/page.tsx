"use client";

import styled from "@emotion/styled";
import FAQ from "@/src/widgets/faq/ui/FAQ";

export default function FAQPage() {
  return (
    <MainContainer>
      <MainContent>
        <FAQ />
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
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem 4rem 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem 4rem 2rem;
  }
`;
