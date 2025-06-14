import { ArrowUp, Heart } from "lucide-react";
import styled from "@emotion/styled";

interface FloatingButtonsProps {
  isLiked: boolean;
  handleLike: () => void;
  scrollToTop: () => void;
}

const FloatingButtons = ({ isLiked, handleLike, scrollToTop }: FloatingButtonsProps) => {


  return (
    <FloatingButtonsContainer>
      <FloatingButton variant="primary" onClick={handleLike}>
        <Heart size={20} fill={isLiked ? "white" : "none"} />
      </FloatingButton>
      <FloatingButton onClick={scrollToTop}>
        <ArrowUp size={20} />
      </FloatingButton>
    </FloatingButtonsContainer>
  )
}

export default FloatingButtons;

const SatisfactionCount = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
`

const FloatingButtonsContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 50;
`

const FloatingButton = styled.button<{ variant?: "primary" | "secondary" }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.variant === "primary" ? "#ff3e6c" : "white")};
  color: ${(props) => (props.variant === "primary" ? "white" : "#666")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`
