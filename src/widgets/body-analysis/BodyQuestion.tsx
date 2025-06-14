import { ChevronLeft, ChevronRight, Sparkles, Target } from "lucide-react";
import { questions } from "@/src/shared/api/mock";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Question } from "@/src/shared/types/body-type";

interface BodyQuestionProps {
  handleAnswer: (questionId: number, answer: string) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  currentQuestion: number;
  answers: Record<number, string>;
  hasAnswered: string;
  progress: number;
  currentQ: Question;
}

const BodyQuestion = ({ progress, handleAnswer, currentQuestion, answers, hasAnswered, goToPrevious, goToNext, currentQ }: BodyQuestionProps) => {

  return (
    <>
      <HeaderSection>
        <HomeLink href="/">
          <ChevronLeft size={20} style={{ marginRight: "0.5rem" }} />
          홈으로 돌아가기
          <IconContainer>
            <Sparkles size={16} color="white" />
          </IconContainer>
        </HomeLink>
        <MainIconContainer>
          <Target size={28} color="white" />
        </MainIconContainer>
        <Title>체형 분석 테스트</Title>
        <TitleUnderline />
      </HeaderSection>

      <ProgressSection>
        <ProgressHeader>
          <ProgressText>진행률</ProgressText>
          <ProgressText>
            {currentQuestion + 1} / {questions.length}
          </ProgressText>
        </ProgressHeader>
        <ProgressContainer>
          <ProgressTrack>
            <ProgressBar progress={progress} />
          </ProgressTrack>
        </ProgressContainer>
      </ProgressSection>

      <QuestionCard>
        <QuestionContent>
          <QuestionHeader>
            <QuestionNumber>{currentQ.id}</QuestionNumber>
            <QuestionText>{currentQ.question}</QuestionText>
          </QuestionHeader>

          <OptionsContainer>
            {currentQ.options.map((option, index) => (
              <OptionButton
                key={index}
                isSelected={answers[currentQ.id] === option.type}
                onClick={() => handleAnswer(currentQ.id, option.type)}
              >
                <OptionContent>
                  <OptionImageContainer>
                    <OptionImage
                      style={{
                        backgroundImage: `url(${option.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </OptionImageContainer>
                  <OptionTextContainer>
                    <OptionText>{option.text}</OptionText>
                  </OptionTextContainer>
                  <RadioButton isSelected={answers[currentQ.id] === option.type} />
                </OptionContent>
              </OptionButton>
            ))}
          </OptionsContainer>
        </QuestionContent>
      </QuestionCard>

      <NavigationContainer>
        <NavButton variant="outline" onClick={goToPrevious} disabled={currentQuestion === 0}>
          <ChevronLeft size={20} style={{ marginRight: "0.5rem" }} />
          이전
        </NavButton>
        <NavButton onClick={goToNext} disabled={!hasAnswered}>
          {currentQuestion === questions.length - 1 ? "결과 보기" : "다음"}
          <ChevronRight size={20} style={{ marginLeft: "0.5rem" }} />
        </NavButton>
      </NavigationContainer>
    </>
  )
}

export default BodyQuestion;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const HomeLink = styled(Link)`
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

const IconContainer = styled.div`
  margin-left: 2rem;
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.75rem;
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

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

const ProgressText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`

const ProgressContainer = styled.div`
  position: relative;
`

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  position: relative;
`

const ProgressBar = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 9999px;
  transition: all 0.5s ease;
  width: ${(props) => props.progress}%;
`

const QuestionCard = styled.div`
  margin-bottom: 1.5rem;
  border: none;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
`

const QuestionContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 640px) {
    padding: 1.25rem;
  }
`

const QuestionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const QuestionNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  color: white;
  border-radius: 50%;
  margin-bottom: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const QuestionText = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const OptionButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid ${(props) => (props.isSelected ? "#f472b6" : "#e5e7eb")};
  background: ${(props) => (props.isSelected ? "linear-gradient(to right, #fdf2f8, #fce7f3)" : "white")};
  transition: all 0.3s ease;
  text-align: left;
  transform: scale(1);
  box-shadow: ${(props) => (props.isSelected ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none")};

  &:hover {
    border-color: #f9a8d4;
    background: linear-gradient(to right, #fdf2f8, #fce7f3);
    transform: scale(1.02);
  }
`

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const OptionImageContainer = styled.div`
  flex-shrink: 0;
`

const OptionImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
  
  @media (max-width: 640px) {
    width: 4rem;
    height: 4rem;
  }
`

const OptionTextContainer = styled.div`
  flex: 1;
`

const OptionText = styled.p`
  color: #111827;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.4;
`

const RadioButton = styled.div<{ isSelected: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.isSelected ? "#ec4899" : "#d1d5db")};
  background: ${(props) => (props.isSelected ? "linear-gradient(to right, #f472b6, #ec4899)" : "transparent")};
  transition: all 0.2s ease;
  box-shadow: ${(props) => (props.isSelected ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none")};
  position: relative;

  ${(props) =>
  props.isSelected &&
  `
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 50%;
    }
  `}
`

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavButton = styled(Button)<{ variant?: string }>`
  display: flex;
  align-items: center;
  border: ${(props) => (props.variant === "outline" ? "2px solid #d1d5db" : "none")};
  color: ${(props) => (props.variant === "outline" ? "#374151" : "white")};
  background: ${(props) =>
  props.variant === "outline" ? "transparent" : "linear-gradient(to right, #f472b6, #ec4899)"};
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  transform: scale(1);
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.variant === "outline" ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)")};

  &:hover {
    background: ${(props) => (props.variant === "outline" ? "#f9fafb" : "linear-gradient(to right, #ec4899, #db2777)")};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    transform: scale(1);
  }
`
