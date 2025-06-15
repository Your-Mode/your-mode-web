import { Sparkles, Target } from "lucide-react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "@/src/shared/components/ui/button";
import ResultSection from "./ResultSection";

interface ResultCardProps {
  info: {
    bgGradient: string;
    gradient: string;
    accent: string;
    title: string;
    detailedDescription: string;
    characteristics: string;
    strengths: string;
    recommendations: string;
    avoidItems: string;
    improvements: string;
    stylingTips: string;
  };
  onRetry: () => void;
}

export default function ResultCard({ info, onRetry }: ResultCardProps) {
  return (
    <StyledResultCard bgGradient={info.bgGradient}>
      <ResultContent>
        <ResultTypeContainer>
          <ResultTypeIcon gradient={info.gradient}>
            <Target size={64} color="white" />
          </ResultTypeIcon>
          <ResultTypeTitle>{info.title}</ResultTypeTitle>
          <ResultTypeDescription>{info.detailedDescription}</ResultTypeDescription>
        </ResultTypeContainer>
        <ResultGrid>
          <ResultSection title="상세 체형 특징" accent={info.accent} content={info.characteristics} />
          <ResultSection title="매력 포인트" accent={info.accent} content={info.strengths} />
          <ResultSection title="추천 스타일 & 아이템" accent={info.accent} content={info.recommendations} />
          <ResultSection title="피해야 할 스타일" accent={info.accent} content={info.avoidItems} />
          <ResultSection title="보완 포인트" accent={info.accent} content={info.improvements} />
          <ResultSection title="스타일링 팁" accent={info.accent} content={info.stylingTips} />
        </ResultGrid>
        <ResultActions>
          <Link href="/content-application">
            <ActionButton gradient={info.gradient}>
              <Sparkles size={20} style={{ marginRight: "0.5rem" }} />
              맞춤 스타일링 신청하기
            </ActionButton>
          </Link>
          <ActionButton onClick={onRetry}>다시 진단하기</ActionButton>
        </ResultActions>
      </ResultContent>
    </StyledResultCard>
  );
}

const StyledResultCard = styled.div<{ bgGradient: string }>`
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
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transform: scale(1);
  transition: transform 0.3s ease;
  &:hover { transform: scale(1.05);}
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

const ResultGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
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
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    transform: scale(1.05);
    background: ${(props) => (props.gradient ? props.gradient : "#f9fafb")};
  }
`;
