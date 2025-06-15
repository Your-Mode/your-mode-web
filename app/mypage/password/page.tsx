"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
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

const PasswordInputContainer = styled.div`
  position: relative;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #ff3e6c;
  }
`

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  line-height: 1.4;
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
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const SaveButton = styled(Button)`
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

export default function PasswordChangePage() {
  const router = useRouter()

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    return hasLetter && hasNumber && hasSpecial && isLongEnough
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const newErrors: { [key: string]: string } = {}
    if (!passwordData.currentPassword) newErrors.currentPassword = "현재 비밀번호를 입력해주세요"
    if (!validatePassword(passwordData.newPassword)) {
      newErrors.newPassword = "영문, 숫자, 특수문자 포함 8자 이상"
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "새 비밀번호가 일치하지 않습니다"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccessMessage("비밀번호가 성공적으로 변경되었습니다!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setErrors({ general: "비밀번호 변경 중 오류가 발생했습니다." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <MainContainer>
      <MainContent>
        <HeaderSection>
          <BackButton href="/mypage">
            <ArrowLeft size={20} />
          </BackButton>
          <PageTitle>비밀번호 변경</PageTitle>
        </HeaderSection>

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="currentPassword">현재 비밀번호</Label>
              <PasswordInputContainer>
                <StyledInput
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="현재 비밀번호를 입력하세요"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </PasswordInputContainer>
              {errors.currentPassword && <ErrorText>{errors.currentPassword}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <PasswordInputContainer>
                <StyledInput
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="새 비밀번호를 입력하세요"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </PasswordInputContainer>
              <HelpText>영문, 숫자, 특수문자를 포함하여 8자 이상 입력하세요</HelpText>
              {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
              <PasswordInputContainer>
                <StyledInput
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </PasswordInputContainer>
              {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
            </FormGroup>

            {successMessage && <SuccessText>{successMessage}</SuccessText>}
            {errors.general && <ErrorText>{errors.general}</ErrorText>}

            <ButtonGroup>
              <CancelButton type="button" onClick={handleCancel}>
                취소
              </CancelButton>
              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "변경 중..." : "비밀번호 변경"}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
