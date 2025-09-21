"use client";

import { X } from "lucide-react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { kakaoLogin } from "@/src/shared/api/auth";

interface SignupMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.overlay};
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow.medium};
  animation: ${fadeIn} 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }
`;

const ModalBody = styled.div`
  padding: 2rem 1.5rem;
`;

const MethodSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SocialTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  text-align: center;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const SocialButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme }) => theme.colors.background.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow.light};
  }
`;

const KakaoButton = styled(SocialButton)`
  color: #3c1e1e;

  &:hover {
    background-color: #fee500;
    border-color: #fee500;
  }
`;

const NaverButton = styled(SocialButton)`
  color: #03c75a;

  &:hover {
    background-color: #e8f5e8;
    border-color: #03c75a;
  }
`;

const EmailMethodButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background-color: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const EmailIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  background-color: #4f46e5;
`;

const MethodContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const MethodTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 0.25rem 0;
`;

const MethodDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border.medium};
  }

  span {
    padding: 0 1rem;
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export default function SignupMethodModal({ isOpen, onClose }: SignupMethodModalProps) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => kakaoLogin(),
    onSuccess: (data) => {
      if (data?.result) {
        window.location.href = data.result;
      }
    },
    onError: (error) => {
      console.error("Kakao Login Error:", error);
    },
  });

  const handleEmailSignup = () => {
    onClose();
    router.push("/signup");
  };

  const handleSocialSignup = (provider: "kakao" | "naver") => {
    mutate()
    onClose();

    // 소셜 로그인 성공 후 추가 정보 입력 페이지로 이동
    /*router.push("/signup/additional-info");*/
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>회원가입 방법 선택</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <MethodSection>
            <SocialSection>
              <SocialTitle>간편 로그인</SocialTitle>
              <SocialButtonsContainer>
                <KakaoButton onClick={() => handleSocialSignup("kakao")}>K</KakaoButton>
                <NaverButton onClick={() => handleSocialSignup("naver")}>N</NaverButton>
              </SocialButtonsContainer>
            </SocialSection>

            <Divider>
              <span>또는</span>
            </Divider>

            <EmailMethodButton onClick={handleEmailSignup}>
              <EmailIcon>@</EmailIcon>
              <MethodContent>
                <MethodTitle>이메일로 회원가입</MethodTitle>
                <MethodDescription>이메일과 비밀번호로 계정을 만들어보세요</MethodDescription>
              </MethodContent>
            </EmailMethodButton>
          </MethodSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}
