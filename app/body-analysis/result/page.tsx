"use client"

import Link from "next/link"
import styled from "@emotion/styled"
import AuthGuard from "@/src/shared/components/auth-guard"
import { ChevronLeft, Target, Award, Sparkles, Eye, Share2, Download } from "lucide-react"
import { getResultInfo } from "@/src/shared/api/getBodyResultInfo";
import BodyResultCard from "@/src/widgets/body-analysis/BodyResultCard";

export default function BodyAnalysisResultPage() {
  const bodyAnalysisResult = {
    type: "wave" as const,
    analysisDate: "2025년 6월 10일",
  }

  const resultInfo = getResultInfo(bodyAnalysisResult.type)

  return (
    <AuthGuard requireAuth={true} message="체형분석 결과를 보려면 로그인이 필요합니다.">
      <Container>
        <MaxWidthContainer>
          <HeaderSection>
            <BackLink href="/mypage">
              <ChevronLeft size={20} style={{ marginRight: "0.5rem" }} />
              마이페이지로 돌아가기
            </BackLink>
            <ResultIconContainer>
              <Award size={32} color="white" />
            </ResultIconContainer>
            <Title>체형 분석 결과</Title>
            <TitleUnderline />
          </HeaderSection>
          <BodyResultCard resultInfo={resultInfo} analysisDate={bodyAnalysisResult.analysisDate} />
        </MaxWidthContainer>
      </Container>
    </AuthGuard>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
  padding-top: 4rem;
  padding-bottom: 2rem;
`

const MaxWidthContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 640px) {
    padding: 0 0.75rem;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4b5563;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #111827;
  }
`

const ResultIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`

const TitleUnderline = styled.div`
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  margin: 0 auto;
  border-radius: 9999px;
`
