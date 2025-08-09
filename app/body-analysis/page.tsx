"use client";

import styled from "@emotion/styled";
import AuthGuard from "@/src/shared/components/auth-guard";
import Survey from "@/src/widgets/body-analysis/Survey";

export default function BodyAnalysisPage() {
  return (
    <AuthGuard requireAuth={true} message="체형 분석을 받으려면 로그인이 필요합니다.">
      <Container>
        <MaxWidthContainer>
          <Survey />
        </MaxWidthContainer>
      </Container>
    </AuthGuard>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
  padding-bottom: 2rem;
`;

const MaxWidthContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  @media (max-width: 640px) {  
    width: 100%;
  }
`;
