import { ThumbsDown, ThumbsUp } from "lucide-react";
import styled from "@emotion/styled";
import { useHandleSatisfaction } from "@/src/widgets/content/feature/useHandleSatisfaction";

const Satisfaction = () => {
  const { isSatisfied, handleSatisfaction } = useHandleSatisfaction();

  return (
    <SatisfactionSection>
      <SatisfactionTitle>컨텐츠가 만족스러우셨나요?</SatisfactionTitle>
      <SatisfactionButtons>
        <SatisfactionButton
          variant="satisfied"
          isSelected={isSatisfied === true}
          onClick={() => handleSatisfaction(true)}
        >
          <ThumbsUp size={20} />
          <span>만족스러워요</span>
        </SatisfactionButton>
        <SatisfactionButton
          variant="unsatisfied"
          isSelected={isSatisfied === false}
          onClick={() => handleSatisfaction(false)}
        >
          <ThumbsDown size={20} />
          <span>불만족스러워요</span>
        </SatisfactionButton>
      </SatisfactionButtons>
    </SatisfactionSection>
  );
};

export default Satisfaction;

const SatisfactionSection = styled.div`
  padding: 1.5rem 2rem;
  background-color: #fafafa;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
  }
`;

const SatisfactionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const SatisfactionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const SatisfactionButton = styled.button<{ isSelected?: boolean; variant: "satisfied" | "unsatisfied" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  color: ${(props) => (props.isSelected ? (props.variant === "satisfied" ? "#10b981" : "#ef4444") : "#666")};

  &:hover {
    color: ${(props) => (props.variant === "satisfied" ? "#10b981" : "#ef4444")};
  }

  svg {
    color: inherit;
  }

  span {
    font-size: 0.875rem;
  }
`;
