"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { Checkbox } from "@/src/shared/components/ui/checkbox"
import Link from "next/link"
import styled from "@emotion/styled"
import { useAuthStore } from "@/src/shared/store/auth"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 28rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem 3rem 1rem;
  }
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
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
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`

const SelectionButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  ${({ selected }) =>
    selected
      ? `
    background-color: #ff3e6c;
    color: white;
    border: 1px solid #ff3e6c;
  `
      : `
    background-color: white;
    color: #333;
    border: 1px solid #d1d5db;
    
    &:hover {
      border-color: #ff3e6c;
      color: #ff3e6c;
    }
  `}
`

const GridSelectionButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  ${({ selected }) =>
    selected
      ? `
    background-color: #ff3e6c;
    color: white;
    border: 1px solid #ff3e6c;
  `
      : `
    background-color: white;
    color: #333;
    border: 1px solid #d1d5db;
    
    &:hover {
      border-color: #ff3e6c;
      color: #ff3e6c;
    }
  `}
`

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  line-height: 1.4;
`

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;
  
  &:hover {
    background-color: #e62e5c;
  }
`

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`

const AgreementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

const AgreementLabel = styled.div`
  font-size: 0.875rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`

const AgreementLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`

const AgreementLink = styled(Link)`
  font-size: 0.75rem;
  color: #666;
  text-decoration: underline;
  
  &:hover {
    color: #ff3e6c;
  }
`

const RequiredBadge = styled.span`
  font-size: 0.7rem;
  color: #ff3e6c;
  font-weight: 500;
  margin-left: 0.25rem;
`

interface FormData {
  name: string
  phone: string
  height: string
  weight: string
  gender: string
  bodyType: string // 다시 string으로 변경
  termsAgreed: boolean
  privacyAgreed: boolean
  marketingAgreed: boolean
}

const bodyTypeOptions = [
  { value: "straight", label: "스트레이트" },
  { value: "wave", label: "웨이브" },
  { value: "natural", label: "내추럴" },
  { value: "unknown", label: "잘 모르겠어요" },
]

const categoryOptions = [
  { value: "casual", label: "캐주얼" },
  { value: "business", label: "비즈니스" },
  { value: "formal", label: "포멀" },
  { value: "street", label: "스트릿" },
  { value: "vintage", label: "빈티지" },
  { value: "minimal", label: "미니멀" },
  { value: "romantic", label: "로맨틱" },
  { value: "sporty", label: "스포티" },
]

export default function AdditionalInfoPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
    bodyType: "", // 빈 문자열로 변경
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    // Validation
    if (!formData.name) newErrors.name = "이름을 입력해주세요"
    if (!formData.phone) newErrors.phone = "전화번호를 입력해주세요"
    if (!formData.height) newErrors.height = "키를 입력해주세요"
    if (!formData.weight) newErrors.weight = "몸무게를 입력해주세요"
    if (!formData.gender) newErrors.gender = "성별을 선택해주세요"
    if (!formData.bodyType) newErrors.bodyType = "체형을 선택해주세요"
    if (!formData.termsAgreed) newErrors.termsAgreed = "서비스 이용약관에 동의해주세요"
    if (!formData.privacyAgreed) newErrors.privacyAgreed = "개인정보 처리방침에 동의해주세요"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Success - redirect to success page
    login({
      name: formData.name,
      email: "social@example.com",
    })
    router.push("/signup/success")
  }

  return (
    <MainContainer>
      <MainContent>
        <FormContainer>
          <Title>추가 정보 입력</Title>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <StyledInput
                id="name"
                type="text"
                placeholder="ex) 김모드"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">전화번호</Label>
              <StyledInput
                id="phone"
                type="tel"
                placeholder="ex) 010-1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="height">키</Label>
                <StyledInput
                  id="height"
                  type="number"
                  placeholder="ex) 165"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
                {errors.height && <ErrorText>{errors.height}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="weight">몸무게</Label>
                <StyledInput
                  id="weight"
                  type="number"
                  placeholder="ex) 55"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
                {errors.weight && <ErrorText>{errors.weight}</ErrorText>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>성별</Label>
              <ButtonGroup>
                <SelectionButton
                  type="button"
                  selected={formData.gender === "male"}
                  onClick={() => setFormData({ ...formData, gender: "male" })}
                >
                  남성
                </SelectionButton>
                <SelectionButton
                  type="button"
                  selected={formData.gender === "female"}
                  onClick={() => setFormData({ ...formData, gender: "female" })}
                >
                  여성
                </SelectionButton>
              </ButtonGroup>
              {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>체형 타입</Label>
              <ButtonGrid>
                {bodyTypeOptions.map((option) => (
                  <GridSelectionButton
                    key={option.value}
                    type="button"
                    selected={formData.bodyType === option.value}
                    onClick={() => setFormData({ ...formData, bodyType: option.value })}
                  >
                    {option.label}
                  </GridSelectionButton>
                ))}
              </ButtonGrid>
              <HelpText>
                체형 타입을 모르시나요?
                <br />
                유어모드에서 제공하는 AI 기반 체형진단을 이용해보세요
              </HelpText>
              {errors.bodyType && <ErrorText>{errors.bodyType}</ErrorText>}
            </FormGroup>

            {/* 약관 동의 섹션 */}
            <FormGroup>
              <Label>약관 동의</Label>
              <AgreementSection>
                <AgreementItem>
                  <Checkbox
                    id="termsAgreed"
                    checked={formData.termsAgreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, termsAgreed: checked as boolean })}
                  />
                  <div>
                    <AgreementLabel>
                      서비스 이용약관 동의
                      <RequiredBadge>(필수)</RequiredBadge>
                    </AgreementLabel>
                    <AgreementLinks>
                      <AgreementLink href="/policy/service">전체보기</AgreementLink>
                    </AgreementLinks>
                    {errors.termsAgreed && <ErrorText>{errors.termsAgreed}</ErrorText>}
                  </div>
                </AgreementItem>

                <AgreementItem>
                  <Checkbox
                    id="privacyAgreed"
                    checked={formData.privacyAgreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, privacyAgreed: checked as boolean })}
                  />
                  <div>
                    <AgreementLabel>
                      개인정보 처리방침 동의
                      <RequiredBadge>(필수)</RequiredBadge>
                    </AgreementLabel>
                    <AgreementLinks>
                      <AgreementLink href="/policy/privacy">전체보기</AgreementLink>
                    </AgreementLinks>
                    {errors.privacyAgreed && <ErrorText>{errors.privacyAgreed}</ErrorText>}
                  </div>
                </AgreementItem>

                <AgreementItem>
                  <Checkbox
                    id="marketingAgreed"
                    checked={formData.marketingAgreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, marketingAgreed: checked as boolean })}
                  />
                  <div>
                    <AgreementLabel>
                      마케팅 정보 수신 동의
                      <span style={{ fontSize: "0.7rem", color: "#666", marginLeft: "0.25rem" }}>(선택)</span>
                    </AgreementLabel>
                    <HelpText>유어모드의 다양한 소식과 혜택을 받아보실 수 있습니다.</HelpText>
                  </div>
                </AgreementItem>
              </AgreementSection>
            </FormGroup>

            <SubmitButton type="submit">가입하기</SubmitButton>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
