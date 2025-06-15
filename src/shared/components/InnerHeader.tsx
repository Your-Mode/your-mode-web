import { ArrowLeft } from "lucide-react";
import type React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

interface InnerHeaderProps {
  title: string;
}

const InnerHeader = ({ title }: InnerHeaderProps) => {
  const router = useRouter();
  return (
    <HeaderSection>
      <BackButton onClick={router.back}>
        <ArrowLeft size={20} />
      </BackButton>
      <PageTitle>비밀번호 찾기</PageTitle>
    </HeaderSection>
  );
};

export default InnerHeader;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #ff3e6c;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;
