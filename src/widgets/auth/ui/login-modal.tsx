"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";
import { usePostLogin } from "@/src/widgets/auth/feature/mutation/usePostLogin";
import { useMutation } from "@tanstack/react-query";
import { kakaoLogin } from "@/src/shared/api/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function LoginModal({ isOpen, onClose, message }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate, isPending, isSuccess } = usePostLogin();
  const { mutate: loginKakao } = useMutation({
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
    loginKakao()
    onClose();

    // 소셜 로그인 성공 후 추가 정보 입력 페이지로 이동
    /*router.push("/signup/additional-info");*/
  };

  const handleLogin = () => {
    mutate({ email, password });
  };

  const closeModal = () => {
    setEmail("");
    setPassword("");
    onClose();
  }

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      alert("로그인에 성공했습니다.");
    }
  }, [isSuccess]);

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>유어모드 로그인</ModalTitle>
            <CloseButton onClick={closeModal}>
              <X size={18} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {message && (
              <MessageSection>
                <MessageText>{message}</MessageText>
              </MessageSection>
            )}
            <form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <LoginButton onClick={handleLogin} disabled={isPending}>{isPending ? '로그인중...' : '로그인'}</LoginButton>
            </form>
            <LinkGroup>
              <TextLink
                onClick={() => {
                  onClose();
                  router.push("/password-reset");
                }}
              >
                비밀번호 찾기
              </TextLink>
              <Divider>|</Divider>
              <TextLink onClick={handleEmailSignup}>회원가입</TextLink>
            </LinkGroup>

            {/*<SocialLoginSection>
              <SocialLoginTitle>간편 로그인</SocialLoginTitle>
              <SocialButtonsContainer>
                <SocialButton onClick={() => handleSocialSignup("kakao")}>
                  <span>K</span>
                </SocialButton>
                <SocialButton>
                  <span>N</span>
                </SocialButton>
              </SocialButtonsContainer>
            </SocialLoginSection>*/}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
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
  padding: 1.5rem;
`;

const MessageSection = styled.div`
  background-color: #fef3f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const MessageText = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-family: ${({ theme }) => theme.fonts.family.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fonts.size.sm};
`;

const TextLink = styled.button`
  color: ${({ theme }) => theme.colors.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.colors.border.medium};
`;

const SocialLoginSection = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const SocialLoginTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.75rem;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow.medium};
  }
`;
