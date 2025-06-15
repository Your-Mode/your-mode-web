import { Clock } from "lucide-react";
import styled from "@emotion/styled";

const ProcessStep = () => {
  return (
    <ProcessContainer>
      <ProcessTitle>
        <Clock size={20} />
        진행 과정 안내
      </ProcessTitle>

      <Step>
        <StepNumber>1</StepNumber>
        <StepContent>
          <StepTitle>신청 접수 완료</StepTitle>
          <StepDescription>고객님의 신청이 정상적으로 접수되었습니다.</StepDescription>
        </StepContent>
      </Step>

      <Step>
        <StepNumber>2</StepNumber>
        <StepContent>
          <StepTitle>에디터 배정 (1-2일)</StepTitle>
          <StepDescription>체형과 요청사항에 맞는 전문 에디터를 배정합니다.</StepDescription>
        </StepContent>
      </Step>

      <Step>
        <StepNumber>3</StepNumber>
        <StepContent>
          <StepTitle>맞춤 컨텐츠 제작 (3-5일)</StepTitle>
          <StepDescription>개인 맞춤형 스타일링 컨텐츠를 제작합니다.</StepDescription>
        </StepContent>
      </Step>

      <Step>
        <StepNumber>4</StepNumber>
        <StepContent>
          <StepTitle>컨텐츠 전달</StepTitle>
          <StepDescription>완성된 컨텐츠를 마이페이지에서 확인하실 수 있습니다.</StepDescription>
        </StepContent>
      </Step>
    </ProcessContainer>
  );
};

export default ProcessStep;

const ProcessContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ProcessTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #ff3e6c;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #ff3e6c;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const StepDescription = styled.div`
  font-size: 0.875rem;
  color: #666;
`;
