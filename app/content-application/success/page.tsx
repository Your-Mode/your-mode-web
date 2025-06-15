"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import ContactInfo from "@/src/widgets/application/ui/success/ContactInfo";
import ProcessStep from "@/src/widgets/application/ui/success/ProcessStep";
import SuccessHeader from "@/src/widgets/application/ui/success/SuccessHeader";
import ButtonArea from "@/src/widgets/application/ui/success/ButtonArea";

export default function ContentApplicationSuccessPage() {
  return (
    <MainContainer>
      <SuccessContainer>
        <SuccessHeader />
        <ProcessStep />
        <ButtonArea />
        <ContactInfo />
      </SuccessContainer>
    </MainContainer>
  );
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 4rem;
  padding-bottom: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 0;
  }
`;

const SuccessContainer = styled.main`
  max-width: 36rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
    border-radius: 16px;
  }
`;
