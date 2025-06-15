import { Award, ChevronLeft } from "lucide-react";
import styled from "@emotion/styled";
import Link from "next/link";

const ResultHeader = () => {
  return (
    <HeaderSection>
      <BackLink href="/mypage">
        <ChevronLeft size={20} style={{ marginRight: "0.5rem" }} />
        마이페이지로 돌아가기
      </BackLink>
      <ResultIconContainer>
        <Award size={32} color="white" />
      </ResultIconContainer>
      <Title>체형 분석 결과</Title>
      <TitleUnderline />
    </HeaderSection>
  );
};

export default ResultHeader;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4b5563;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #111827;
  }
`

const ResultIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`

const TitleUnderline = styled.div`
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  margin: 0 auto;
  border-radius: 9999px;
`
