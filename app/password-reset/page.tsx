"use client";

import type React from "react";
import { Phone } from "lucide-react";
import styled from "@emotion/styled";
import InnerHeader from "@/src/shared/components/InnerHeader";
import CodeStep from "@/src/widgets/auth/ui/passwordReset/CodeStep";
import PasswordStep from "@/src/widgets/auth/ui/passwordReset/PasswordStep";
import PhoneStep from "@/src/widgets/auth/ui/passwordReset/PhoneStep";
import { useHandlePasswordReset } from "@/src/widgets/auth/feature/hooks/useHandlePasswordReset";
import { getDescription } from "@/src/widgets/auth/feature/utils/utils";


export default function PasswordResetPage() {
  const { step, isLoading, timer, handlePhoneNext, handleCodeNext, handlePasswordNext } = useHandlePasswordReset();

  return (
    <MainContainer>
      <MainContent>
        <InnerHeader title="비밀번호 찾기" />
        <FormContainer>
          <IconContainer>
            <MailIcon>
              <Phone size={24} />
            </MailIcon>
          </IconContainer>
          <Description>{getDescription(step)}</Description>
          {step === 1 && <PhoneStep onSubmit={handlePhoneNext} isLoading={isLoading} />}
          {step === 2 && <CodeStep onSubmit={handleCodeNext} isLoading={isLoading} timer={timer} />}
          {step === 3 && <PasswordStep onSubmit={handlePasswordNext} isLoading={isLoading} />}
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
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem 3rem 1rem;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const MailIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff3e6c, #e62e5c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
