import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styled from "@emotion/styled";
import { Button } from "@/src/shared/components/ui/button";

const ButtonArea = () => {
  return (
    <ButtonContainer>
      <Link href="/mypage">
        <PrimaryButton>
          마이페이지 이동
          <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
        </PrimaryButton>
      </Link>
      <Link href="/contents">
        <SecondaryButton>다른 컨텐츠 보기</SecondaryButton>
      </Link>
    </ButtonContainer>
  );
};

export default ButtonArea;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`;
