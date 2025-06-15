import styled from "@emotion/styled";
import { CheckCircle, Palette, User } from "lucide-react";
import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";

const SuccessHeader = () => {
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);

  useEffect(() => {
    setApplicationNumber(`CA${Date.now().toString().slice(-6)}`);
  }, []);

  return (
    <>
      <IconContainer>
        <CheckIcon size={80} />
        <FloatingIcon delay={0}>
          <PaletteIcon size={24} />
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <UserIcon size={20} />
        </FloatingIcon>
      </IconContainer>

      <Title>스타일링 컨텐츠 신청 완료!</Title>
      <Subtitle>
        신청해주셔서 감사합니다!
        <br />
        전문 에디터가 맞춤형 스타일링을 준비하고 있어요.
      </Subtitle>

      <ApplicationNumber>📋 신청번호: {applicationNumber}</ApplicationNumber>
    </>
  );
};

export default SuccessHeader;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const IconContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  animation: ${pulse} 2s infinite;
`;

const CheckIcon = styled(CheckCircle)`
  color: #10b981;
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));
`;

const FloatingIcon = styled.div<{ delay: number }>`
  position: absolute;
  animation: ${float} 3s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const PaletteIcon = styled(Palette)`
  color: #ff3e6c;
  position: absolute;
  top: -20px;
  right: -20px;
`;

const UserIcon = styled(User)`
  color: #667eea;
  position: absolute;
  bottom: -15px;
  left: -15px;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const ApplicationNumber = styled.div`
  background: linear-gradient(135deg, #ff3e6c, #ff8e8e);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  font-weight: 600;
`;
