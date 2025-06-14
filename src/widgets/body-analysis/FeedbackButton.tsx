import React, { useState } from "react";
import styled from "@emotion/styled";

// Button
const FeedbackButton = ({ buttonType, children, ...props }: {
  buttonType: "satisfied" | "unsatisfied";
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <StyledFeedbackButton buttonType={buttonType} {...props}>
    {children}
  </StyledFeedbackButton>
);

export default FeedbackButton;

const StyledFeedbackButton = styled.button<{ buttonType: "satisfied" | "unsatisfied" }>`
  padding: 0.75rem 1.5rem;
  background: ${({ buttonType }) =>
  buttonType === "satisfied"
    ? "linear-gradient(to right, #34d399, #14b8a6)"
    : "linear-gradient(to right, #f87171, #ef4444)"};
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
