"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import Link from "next/link";
import styled from "@emotion/styled";
import Agreement from "@/src/widgets/auth/ui/sign-up/Agreement";
import BodyType from "@/src/widgets/auth/ui/sign-up/BodyType";
import Gender from "@/src/widgets/auth/ui/sign-up/Gender";
import BodyInfo from "@/src/widgets/auth/ui/sign-up/BodyInfo";
import { useHandleSighup } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import SignupForm from "@/src/widgets/auth/ui/sign-up/SignupForm";

export default function SignupPage() {
  return (
    <MainContainer>
      <MainContent>
        <SignupForm />
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
  max-width: 28rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;
