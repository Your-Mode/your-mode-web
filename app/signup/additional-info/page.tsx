"use client";

import type React from "react";

import styled from "@emotion/styled";
import AdditionalInfoForm from "@/src/widgets/auth/ui/AdditionalInfo/AdditionalInfoForm";

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`;

const MainContent = styled.main`
  max-width: 28rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

export default function AdditionalInfoPage() {
  return (
    <MainContainer>
      <MainContent>
        <AdditionalInfoForm />
      </MainContent>
    </MainContainer>
  );
}
