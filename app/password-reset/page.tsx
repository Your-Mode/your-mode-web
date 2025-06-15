"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #666;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #ff3e6c;
  }
`

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`

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
`

const Description = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const StyledInput = styled(Input)`
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const SuccessText = styled.p`
  color: #10b981;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  text-align: center;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const SendButton = styled(Button)`
  flex: 1;
  background-color: #ff3e6c;
  
  &:hover {
    background-color: #e62e5c;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const CancelButton = styled(Button)`
  flex: 1;
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const MailIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff3e6c, #e62e5c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

export default function PasswordResetPage() {
  const router = useRouter()

  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1: 이메일, 2: 인증코드, 3: 비밀번호 재설정
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [timer, setTimer] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
    return phoneRegex.test(phone.replace(/-/g, ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (step === 1) {
      // 이메일 입력 단계
      if (!phoneNumber) {
        setError("전화번호를 입력해주세요")
        setIsLoading(false)
        return
      }

      if (!validatePhoneNumber(phoneNumber)) {
        setError("올바른 전화번호 형식을 입력해주세요")
        setIsLoading(false)
        return
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccessMessage("인증코드가 SMS로 발송되었습니다.")
        setStep(2)
        setTimer(60)
      } catch (error) {
        setError("인증코드 발송 중 오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    } else if (step === 2) {
      // 인증코드 확인 단계
      if (!verificationCode) {
        setError("인증코드를 입력해주세요")
        setIsLoading(false)
        return
      }

      if (verificationCode.length !== 6) {
        setError("6자리 인증코드를 입력해주세요")
        setIsLoading(false)
        return
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSuccessMessage("인증이 완료되었습니다.")
        setStep(3)
      } catch (error) {
        setError("인증코드가 올바르지 않습니다.")
      } finally {
        setIsLoading(false)
      }
    } else if (step === 3) {
      // 비밀번호 재설정 단계
      if (!newPassword) {
        setError("새 비밀번호를 입력해주세요")
        setIsLoading(false)
        return
      }

      if (newPassword.length < 8) {
        setError("비밀번호는 8자 이상이어야 합니다")
        setIsLoading(false)
        return
      }

      if (newPassword !== confirmPassword) {
        setError("비밀번호가 일치하지 않습니다")
        setIsLoading(false)
        return
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.")
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (error) {
        setError("비밀번호 변경 중 오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const getDescription = () => {
    if (step === 1) {
      return "가입하신 전화번호를 입력하시면 SMS로 인증코드를 보내드립니다."
    } else if (step === 2) {
      return `${phoneNumber}로 발송된 6자리 인증코드를 입력해주세요.`
    } else {
      return "새로운 비밀번호를 설정해주세요."
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  return (
    <MainContainer>
      <MainContent>
        <HeaderSection>
          <BackButton href="/">
            <ArrowLeft size={20} />
          </BackButton>
          <PageTitle>비밀번호 찾기</PageTitle>
        </HeaderSection>

        <FormContainer>
          <IconContainer>
            <MailIcon>
              <Phone size={24} />
            </MailIcon>
          </IconContainer>

          <Description>{getDescription()}</Description>

          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <FormGroup>
                <Label htmlFor="phoneNumber">전화번호</Label>
                <StyledInput
                  id="phoneNumber"
                  type="tel"
                  placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
            )}

            {step === 2 && (
              <FormGroup>
                <Label htmlFor="code">인증코드</Label>
                <StyledInput
                  id="code"
                  type="text"
                  placeholder="6자리 인증코드를 입력하세요"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
                {timer > 0 && (
                  <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.5rem" }}>{timer}초 후 재전송 가능</p>
                )}
              </FormGroup>
            )}

            {step === 3 && (
              <>
                <FormGroup>
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <StyledInput
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="새 비밀번호를 입력하세요"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                  <StyledInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="새 비밀번호를 다시 입력하세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
              </>
            )}

            {error && <ErrorText>{error}</ErrorText>}
            {successMessage && <SuccessText>{successMessage}</SuccessText>}

            <ButtonGroup>
              <CancelButton type="button" onClick={handleCancel}>
                취소
              </CancelButton>
              <SendButton type="submit" disabled={isLoading}>
                {isLoading
                  ? step === 1
                    ? "발송 중..."
                    : step === 2
                      ? "확인 중..."
                      : "변경 중..."
                  : step === 1
                    ? "인증코드 전송"
                    : step === 2
                      ? "인증 확인"
                      : "비밀번호 변경"}
              </SendButton>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
