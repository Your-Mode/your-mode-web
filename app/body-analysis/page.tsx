"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import AuthGuard from "@/src/shared/components/auth-guard";
import { questions } from "@/src/shared/api/mock";
import BodyQuestion from "@/src/widgets/body-analysis/BodyQuestion";
import BodyResult from "@/src/widgets/body-analysis/BodyResult";

export default function BodyAnalysisPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const calculateResult = () => {
    const counts = { natural: 0, straight: 0, wave: 0 };
    Object.values(answers).forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const result = Object.entries(counts).find(([_, count]) => count === maxCount)?.[0];

    return result as "natural" | "straight" | "wave";
  };

  const handleAnswer = (questionId: number, answerType: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerType }));
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswered = answers[currentQ.id];

  return (
    <AuthGuard requireAuth={true} message="체형 분석을 받으려면 로그인이 필요합니다.">
      <Container>
        <MaxWidthContainer>
          {showResult ? (
            <BodyResult
              resultType={calculateResult()}
              onRetry={() => window.location.reload()}
            />
          ) : (
            <BodyQuestion
              currentQ={currentQ}
              progress={progress}
              hasAnswered={hasAnswered}
              currentQuestion={currentQuestion}
              answers={answers}
              handleAnswer={handleAnswer}
              goToNext={goToNext}
              goToPrevious={goToPrevious}
            />
          )}
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
