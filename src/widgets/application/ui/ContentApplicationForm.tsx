"use client";

import styled from "@emotion/styled";
import ApplicationForm from "./ApplicationForm";

export default function ContentApplicationForm() {
  return (
    <MainContainer>
      <FormContainer>
        <HeaderSection>
          <Title>이런 패션 콘텐츠를 원해요!</Title>
          <Subtitle>
            유어모드에게 원하는 패션 콘텐츠를 알려주시면,
            <br />
            당신에게 딱 맞는 아이템을 추천드릴게요 :)
          </Subtitle>
        </HeaderSection>
        <ApplicationForm />
      </FormContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

const FormContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  line-height: 1.6;
  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;
