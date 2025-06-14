import { Award } from "lucide-react";
import styled from "@emotion/styled";
import ResultCard from "./ResultCard";
import Feedback from "./Feedback";
import { getResultInfo } from "@/src/shared/api/getBodyResultInfo";

interface BodyResultProps {
  resultType: "natural" | "straight" | "wave";
  onRetry: () => void;
}

export default function BodyResult({ resultType, onRetry }: BodyResultProps) {
  const info = getResultInfo(resultType);

  return (
    <>
      <HeaderSection>
        <ResultIconContainer>
          <Award size={32} color="white" />
        </ResultIconContainer>
        <ResultTitle>체형 분석 결과</ResultTitle>
        <TitleUnderline />
      </HeaderSection>
      <ResultCard info={info} onRetry={onRetry} />
      <Feedback />
    </>
  );
}

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ResultIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
`;

const ResultTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const TitleUnderline = styled.div`
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  margin: 0 auto;
  border-radius: 9999px;
`;
