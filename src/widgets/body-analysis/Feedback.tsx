import { useState } from "react";
import styled from "@emotion/styled";
import FeedbackButton from "@/src/widgets/body-analysis/FeedbackButton";
import ThankYouModal from "@/src/widgets/body-analysis/ThankYouModal";

// 메인 피드백 컴포넌트
const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState<"satisfied" | "unsatisfied" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  return (
    <>
      <FeedbackContainer>
        <FeedbackTitle>분석 결과가 어떠셨나요?</FeedbackTitle>
        {!feedbackType ? (
          <FeedbackButtonWrap>
            <FeedbackButton buttonType="satisfied" onClick={() => setFeedbackType("satisfied")}>
              😊 만족스러워요
            </FeedbackButton>
            <FeedbackButton buttonType="unsatisfied" onClick={() => setFeedbackType("unsatisfied")}>
              😞 불만족스러워요
            </FeedbackButton>
          </FeedbackButtonWrap>
        ) : (
          <div>
            <FeedbackQuestion>
              {feedbackType === "satisfied"
                ? "어떤 부분이 만족스러웠나요?"
                : "어떤 부분이 만족스럽지 않았나요?"}
            </FeedbackQuestion>
            <FeedbackText
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="자세한 의견을 남겨주세요..."
            />
            <ButtonGroup>
              <CompleteButton
                buttonType={feedbackType}
                disabled={!feedbackText.trim()}
                onClick={() => setShowThankYouModal(true)}
              >
                완료
              </CompleteButton>
              <CancelButton
                onClick={() => {
                  setFeedbackType(null);
                  setFeedbackText("");
                }}
              >
                취소
              </CancelButton>
            </ButtonGroup>
          </div>
        )}
      </FeedbackContainer>
      {showThankYouModal && (
        <ThankYouModal
          onClose={() => {
            setShowThankYouModal(false);
            setFeedbackType(null);
            setFeedbackText("");
          }}
        />
      )}
    </>
  );
};

export default Feedback;

// emotion styled
const FeedbackContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.75rem;
`;

const FeedbackTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  text-align: center;
`;

const FeedbackButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const FeedbackQuestion = styled.p`
  font-size: 1rem;
  color: #374151;
  margin-bottom: 1rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

// Textarea
const FeedbackText = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: vertical;
  margin-bottom: 1rem;
`;

// Cancel Button
const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #6b7280;
  border: 2px solid #d1d5db;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #f9fafb;
    transform: scale(1.05);
  }
`;

// 완료 Button
const CompleteButton = styled.button<{ buttonType: "satisfied" | "unsatisfied" }>`
  padding: 0.75rem 1.5rem;
  background: ${({ buttonType }) =>
  buttonType === "satisfied"
    ? "linear-gradient(to right, #34d399, #14b8a6)"
    : "linear-gradient(to right, #f87171, #ef4444)"};
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: transform 0.3s ease;
  &:hover {
    ${({ disabled }) => !disabled && "transform: scale(1.05);"}
  }
`;
