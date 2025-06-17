"use client";

import styled from "@emotion/styled";
import Success from "@/src/widgets/auth/ui/success/Success";

export default function SignupSuccessPage() {
  return (
    <MainContainer>
      <MainContent>
        <Success />
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff3e6c 0%, #ff8e8e 50%, #ffc1cc 100%);
  padding-top: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 0;
  }
`;

const MainContent = styled.main`
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;
