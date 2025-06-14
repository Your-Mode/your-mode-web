"use client";
import styled from "@emotion/styled";
import ContactForm from "@/src/widgets/contact/ui/ContactForm";

export default function ContactPage() {
  return (
    <MainContainer>
      <MainContent>
        <PageTitle>문의하기</PageTitle>
        <FormContainer>
          <ContactForm />
        </FormContainer>
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`;

const MainContent = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem 4rem 1rem;
  @media (min-width: 640px) {
    padding: 0 2rem 4rem 2rem;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
