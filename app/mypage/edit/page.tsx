"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
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

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const StyledInput = styled(Input)`
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #666;
    cursor: not-allowed;
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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const DisabledNote = styled.span`
  font-size: 0.75rem;
  color: #999;
  font-style: italic;
`

export default function ProfileEditPage() {
  const router = useRouter()

  // 기존 사용자 정보 (실제로는 API에서 가져올 데이터)
  const [profileData, setProfileData] = useState({
    email: "yourmode@naver.com",
    name: "김정윤",
    phone: "010-1234-5678",
    height: "165",
    weight: "55",
    bodyType: "wave",
  })

  // 기본 정보 상태
  const [basicInfoLoading, setBasicInfoLoading] = useState(false)
  const [basicInfoSuccess, setBasicInfoSuccess] = useState("")
  const [basicInfoErrors, setBasicInfoErrors] = useState<{ [key: string]: string }>({})

  // 기본 정보 저장 함수
  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBasicInfoLoading(true)
    setBasicInfoErrors({})

    const newErrors: { [key: string]: string } = {}
    if (!profileData.name) newErrors.name = "이름을 입력해주세요"
    if (!profileData.phone) newErrors.phone = "전화번호를 입력해주세요"
    if (!profileData.height) newErrors.height = "키를 입력해주세요"
    if (!profileData.weight) newErrors.weight = "몸무게를 입력해주세요"
    if (!profileData.bodyType) newErrors.bodyType = "체형을 선택해주세요"

    if (Object.keys(newErrors).length > 0) {
      setBasicInfoErrors(newErrors)
      setBasicInfoLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBasicInfoSuccess("기본 정보가 성공적으로 업데이트되었습니다!")
      setTimeout(() => setBasicInfoSuccess(""), 3000)
    } catch (error) {
      setBasicInfoErrors({ general: "기본 정보 업데이트 중 오류가 발생했습니다." })
    } finally {
      setBasicInfoLoading(false)
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
          <PageTitle>기본정보 변경</PageTitle>
        </HeaderSection>

        <FormContainer>
          <Form onSubmit={handleBasicInfoSubmit}>
            {/* 기본 정보 섹션 */}
            <FormSection>
              <SectionTitle>기본정보</SectionTitle>

              <FormGroup>
                <Label htmlFor="email">이메일</Label>
                <StyledInput id="email" type="email" value={profileData.email} disabled />
                <DisabledNote>이메일은 변경할 수 없습니다</DisabledNote>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="name">이름</Label>
                <StyledInput
                  id="name"
                  placeholder="ex) 김모드"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                {basicInfoErrors.name && <ErrorText>{basicInfoErrors.name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">전화번호</Label>
                <StyledInput
                  id="phone"
                  placeholder="ex) 010-1234-5678"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
                {basicInfoErrors.phone && <ErrorText>{basicInfoErrors.phone}</ErrorText>}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="height">키 (cm)</Label>
                  <StyledInput
                    id="height"
                    type="number"
                    placeholder="ex) 165"
                    value={profileData.height}
                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                  />
                  {basicInfoErrors.height && <ErrorText>{basicInfoErrors.height}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="weight">몸무게 (kg)</Label>
                  <StyledInput
                    id="weight"
                    type="number"
                    placeholder="ex) 55"
                    value={profileData.weight}
                    onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                  />
                  {basicInfoErrors.weight && <ErrorText>{basicInfoErrors.weight}</ErrorText>}
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>체형 타입</Label>
                <RadioGroup
                  value={profileData.bodyType}
                  onValueChange={(value) => setProfileData({ ...profileData, bodyType: value })}
                >
                  <RadioContainer>
                    <RadioItem>
                      <RadioGroupItem value="straight" id="straight" />
                      <Label htmlFor="straight">스트레이트</Label>
                    </RadioItem>
                    <RadioItem>
                      <RadioGroupItem value="wave" id="wave" />
                      <Label htmlFor="wave">웨이브</Label>
                    </RadioItem>
                    <RadioItem>
                      <RadioGroupItem value="natural" id="natural" />
                      <Label htmlFor="natural">내추럴</Label>
                    </RadioItem>
                    <RadioItem>
                      <RadioGroupItem value="unknown" id="unknown" />
                      <Label htmlFor="unknown">잘 모르겠어요</Label>
                    </RadioItem>
                  </RadioContainer>
                </RadioGroup>
                <HelpText>
                  체형 타입을 모르시나요?
                  <br />
                  유어모드에서 제공하는 AI 기반 체형진단을 이용해보세요
                </HelpText>
                {basicInfoErrors.bodyType && <ErrorText>{basicInfoErrors.bodyType}</ErrorText>}
              </FormGroup>
            </FormSection>

            {basicInfoSuccess && <SuccessText>{basicInfoSuccess}</SuccessText>}
            {basicInfoErrors.general && <ErrorText>{basicInfoErrors.general}</ErrorText>}

            <ButtonGroup>
              <SaveButton type="submit" disabled={basicInfoLoading}>
                {basicInfoLoading ? "저장 중..." : "기본 정보 저장"}
              </SaveButton>
            </ButtonGroup>
          </Form>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
          </ButtonGroup>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
