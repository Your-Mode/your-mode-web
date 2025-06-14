import { Download, Eye, Share2, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "@/components/ui/button";

interface BodyResultCardProps {
  resultInfo: {
    title: string
    description: string
    detailedDescription: string
    characteristics: string
    strengths: string
    recommendations: string
    avoidItems: string
    improvements: string
    stylingTips: string
    gradient: string
    bgGradient: string
    accent: string
  };
  analysisDate: string;

}

const BodyResultCard = ({ resultInfo, analysisDate }: BodyResultCardProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나의 체형분석 결과: ${resultInfo.title}`,
          text: resultInfo.description,
          url: window.location.href,
        });
      } catch ( error ) {
        console.log("공유 취소됨");
      }
    } else {
      // 웹 공유 API를 지원하지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  const handleDownload = () => {
    // PDF 다운로드 기능 구현 (실제로는 PDF 생성 라이브러리 사용)
    alert("PDF 다운로드 기능은 준비 중입니다!");
  };

  return (
    <ResultCard bgGradient={resultInfo.bgGradient}>
      <ResultContent>
        <ResultTypeContainer>
          <ResultTypeIcon gradient={resultInfo.gradient}>
            <Target size={64} color="white" />
          </ResultTypeIcon>
          <ResultTypeTitle>{resultInfo.title}</ResultTypeTitle>
          <AnalysisDate>
            <Eye size={16} />
            분석일: {analysisDate}
          </AnalysisDate>
          <ResultTypeDescription>{resultInfo.detailedDescription}</ResultTypeDescription>
        </ResultTypeContainer>

        <ResultGrid>
          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              상세 체형 특징
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.characteristics}</ResultParagraph>
          </ResultSection>

          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              매력 포인트
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.strengths}</ResultParagraph>
          </ResultSection>

          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              추천 스타일 & 아이템
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.recommendations}</ResultParagraph>
          </ResultSection>

          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              피해야 할 스타일
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.avoidItems}</ResultParagraph>
          </ResultSection>

          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              보완 포인트
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.improvements}</ResultParagraph>
          </ResultSection>

          <ResultSection>
            <ResultSectionTitle>
              <ResultSectionDot accent={resultInfo.accent} />
              스타일링 팁
            </ResultSectionTitle>
            <ResultParagraph>{resultInfo.stylingTips}</ResultParagraph>
          </ResultSection>
        </ResultGrid>

        <ResultActions>
          <Link href="/content-application">
            <ActionButton gradient={resultInfo.gradient}>
              <Sparkles size={20} style={{ marginRight: "0.5rem" }} />
              맞춤 스타일링 신청하기
            </ActionButton>
          </Link>
          <Link href="/body-analysis">
            <ActionButton>다시 진단하기</ActionButton>
          </Link>
        </ResultActions>

        <SecondaryActions>
          <ActionButton onClick={handleShare}>
            <Share2 size={16} style={{ marginRight: "0.5rem" }} />
            결과 공유하기
          </ActionButton>
          <ActionButton onClick={handleDownload}>
            <Download size={16} style={{ marginRight: "0.5rem" }} />
            PDF 다운로드
          </ActionButton>
        </SecondaryActions>
      </ResultContent>
    </ResultCard>
  );
};

export default BodyResultCard;

const ResultCard = styled.div<{ bgGradient: string }>`
  border: none;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: ${(props) =>
    props.bgGradient === "from-emerald-50 to-teal-50"
      ? "linear-gradient(to bottom right, #ecfdf5, #f0fdfa)"
      : props.bgGradient === "from-blue-50 to-indigo-50"
        ? "linear-gradient(to bottom right, #eff6ff, #eef2ff)"
        : "linear-gradient(to bottom right, #fdf2f8, #fce7f3)"};
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
`;

const ResultContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ResultTypeContainer = styled.div`
  margin-bottom: 2rem;
`;

const ResultTypeIcon = styled.div<{ gradient: string }>`
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1.5rem;
  background: ${(props) =>
    props.gradient === "from-emerald-400 to-teal-500"
      ? "linear-gradient(to bottom right, #34d399, #14b8a6)"
      : props.gradient === "from-blue-400 to-indigo-500"
        ? "linear-gradient(to bottom right, #60a5fa, #6366f1)"
        : "linear-gradient(to bottom right, #fb7185, #ec4899)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ResultTypeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.75rem;
`;

const ResultTypeDescription = styled.p`
  color: #374151;
  font-size: 1.125rem;
  text-align: center;
  margin: 0 auto 1.5rem;
  max-width: 42rem;
  line-height: 1.6;
`;

const AnalysisDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  display: inline-flex;
`;

const ResultGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ResultSection = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 100%;
`;

const ResultSectionTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 1.25rem;
`;

const ResultSectionDot = styled.span<{ accent: string }>`
  width: 0.75rem;
  height: 0.75rem;
  background: ${(props) =>
    props.accent === "emerald-500" ? "#10b981" : props.accent === "blue-500" ? "#3b82f6" : "#f43f5e"};
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ResultParagraph = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ResultActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ActionButton = styled(Button)<{ gradient?: string }>`
  background: ${(props) =>
    props.gradient
      ? props.gradient === "from-emerald-400 to-teal-500"
        ? "linear-gradient(to right, #34d399, #14b8a6)"
        : props.gradient === "from-blue-400 to-indigo-500"
          ? "linear-gradient(to right, #60a5fa, #6366f1)"
          : "linear-gradient(to right, #fb7185, #ec4899)"
      : "transparent"};
  color: ${(props) => (props.gradient ? "white" : "#374151")};
  border: ${(props) => (props.gradient ? "none" : "2px solid #d1d5db")};
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transform: scale(1);
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.gradient ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none")};

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
    background: ${(props) => (props.gradient ? props.gradient : "#f9fafb")};
  }
`;

const SecondaryActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;
