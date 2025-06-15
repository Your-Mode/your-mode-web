import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface ApplicationFormGroupProps {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
  helpText?: string;
  error?: string;
  asRow?: boolean;
}

export default function ApplicationFormGroup({ label, htmlFor, children, helpText, error, asRow }: ApplicationFormGroupProps) {
  return (
    <Group $asRow={asRow}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {helpText && <HelpText>{helpText}</HelpText>}
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Group>
  );
}

const Group = styled.div<{ $asRow?: boolean }>`
  display: flex;
  flex-direction: ${({ $asRow }) => ($asRow ? "row" : "column")};
  gap: 0.5rem;
  align-items: ${({ $asRow }) => ($asRow ? "center" : "stretch")};
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
`;

const HelpText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ErrorMsg = styled.span`
  color: #e62e5c;
  font-size: 0.92rem;
  font-weight: 500;
  margin-top: 2px;
`;
