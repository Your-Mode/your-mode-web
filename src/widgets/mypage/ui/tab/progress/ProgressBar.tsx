import styled from "@emotion/styled";
import { Progress } from "@radix-ui/react-progress";

interface ProgressProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressProps) => {
  return (
    <ProgressSection>
      <ProgressHeader>
        <ProgressLabel>진행 상황</ProgressLabel>
        <ProgressValue>{progress}%</ProgressValue>
      </ProgressHeader>
      <Progress value={progress} className="h-2" />
    </ProgressSection>
  )
}

export default ProgressBar;

const ProgressSection = styled.div`
  margin: 1rem 0;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ProgressLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const ProgressValue = styled.span`
  color: #333;
  font-weight: 600;
`;
