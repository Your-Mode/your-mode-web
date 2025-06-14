import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface FormGroupProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
}

export default function FormGroup({ label, htmlFor, children, error }: FormGroupProps) {
  return (
    <Group>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Group>
  );
}

// 스타일
const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
`;

const ErrorMsg = styled.span`
  color: #e62e5c;
  font-size: 0.92rem;
  font-weight: 500;
  margin-top: 2px;
`;
