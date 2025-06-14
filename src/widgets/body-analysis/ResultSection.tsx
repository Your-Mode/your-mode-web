import styled from "@emotion/styled";

interface ResultSectionProps {
  title: string;
  accent: string;
  content: string;
}

export default function ResultSection({ title, accent, content }: ResultSectionProps) {
  return (
    <Section>
      <SectionTitle>
        <SectionDot accent={accent} />
        {title}
      </SectionTitle>
      <SectionParagraph>{content}</SectionParagraph>
    </Section>
  );
}

const Section = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  text-align: left;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

const SectionDot = styled.span<{ accent: string }>`
  width: 0.75rem;
  height: 0.75rem;
  background: ${({ accent }) =>
    accent === "emerald-500"
      ? "#10b981"
      : accent === "blue-500"
        ? "#3b82f6"
        : "#f43f5e"};
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const SectionParagraph = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1rem;
`;
