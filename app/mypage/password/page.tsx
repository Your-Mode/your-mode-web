"use client";

import type React from "react";
import styled from "@emotion/styled";
import InnerHeader from "@/src/shared/components/InnerHeader";
import PasswordChangeForm from "@/src/widgets/mypage/ui/password/PasswordChangeForm";

export default function PasswordChangePage() {

  return (
    <MainContainer>
      <InnerHeader title="비밀번호 변경" />
      <PasswordChangeForm />
    </MainContainer>
  );
}

const MainContainer = styled.main`
  max-width: 32rem;
  margin: 2rem auto;
  padding: 0 1rem;
`;
