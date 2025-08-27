"use client";

import styled from "@emotion/styled";
import AuthGuard from "@/src/shared/components/auth-guard";
import BodyResultCard from "@/src/widgets/body-analysis/BodyResultCard";
import ResultHeader from "@/src/widgets/body-analysis/ResultHeader";

export default function BodyAnalysisResultPage() {
  const bodyAnalysisResult = {
    type: "wave" as const,
    analysisDate: "2025년 6월 10일",
  };

  return (
    <AuthGuard requireAuth={true} message="체형분석 결과를 보려면 로그인이 필요합니다.">
      <Container>
        <MaxWidthContainer>
          <ResultHeader />
          <BodyResultCard analysisDate={bodyAnalysisResult.analysisDate} />
        </MaxWidthContainer>
      </Container>
    </AuthGuard>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
  padding-top: 4rem;
  padding-bottom: 2rem;
`;

const MaxWidthContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 640px) {
    padding: 0 0.75rem;
  }
`;
