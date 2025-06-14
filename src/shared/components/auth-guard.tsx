"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/shared/store/auth";
import LoginModal from "@/src/widgets/auth/ui/login-modal";
import styled from "@emotion/styled";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  message?: string;
}

export default function AuthGuard({ children, requireAuth = false, message = "이 기능을 이용하려면 로그인이 필요합니다.", }: AuthGuardProps) {
  const { isLoggedIn } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (requireAuth && !isLoggedIn) {
      setShowMessage(true);
      setShowLoginModal(true);
    }
  }, [requireAuth, isLoggedIn]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowMessage(false);
  };

  if (requireAuth && !isLoggedIn) {
    return (
      <>
        <AuthGuardContainer>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <AuthGuardMessage>로그인이 필요합니다</AuthGuardMessage>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem", }}>{message}</p>
          <AuthGuardButton
            onClick={() => setShowLoginModal(true)}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            로그인하기
          </AuthGuardButton>
        </AuthGuardContainer>
        <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} message={showMessage ? message : undefined} />
      </>
    );
  }

  return <>{children}</>;
}


const AuthGuardContainer = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
`;

const AuthGuardMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const AuthGuardButton = styled.button`
  background: linear-gradient(to right, #f472b6, #ec4899);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
`;
