"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import styled from "@emotion/styled"
import AuthGuard from "@/src/shared/components/auth-guard"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 48rem;
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
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const Subtitle = styled.p`
  color: #666;
  line-height: 1.6;
  
  @media (max-width: 640px) {
    font-size: 0.875rem;
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

const StyledTextarea = styled(Textarea)`
  min-height: 100px;
  
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const HelpText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;
  
  &:hover {
    background-color: #e62e5c;
  }
`

function ContentApplicationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "김정윤",
    bodyType: "웨이브 체형",
    height: "",
    weight: "",
    bodyFeatures: "",
    recommendedItems: [] as string[],
    situation: "",
    preferredStyle: "",
    avoidStyle: "",
    budget: "",
    uploadConsent: false,
  })

  const itemOptions = ["아우터", "상의", "하의", "가방", "신발", "악세서리", "기타"]

  const handleItemChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        recommendedItems: [...formData.recommendedItems, item],
      })
    } else {
      setFormData({
        ...formData,
        recommendedItems: formData.recommendedItems.filter((i) => i !== item),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Content application submitted:", formData)
    router.push("/content-application/success")
  }

  return (
    <MainContainer>
      <MainContent>
        <FormContainer>
          <HeaderSection>
            <Title>이런 패션 콘텐츠를 원해요!</Title>
            <Subtitle>
              유어모드에게 원하는 패션 콘텐츠를 알려주시면,
              <br />
              당신에게 딱 맞는 아이템을 추천드릴게요 :)
            </Subtitle>
          </HeaderSection>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <StyledInput
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                readOnly
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bodyType">체형</Label>
              <StyledInput
                id="bodyType"
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                readOnly
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="height">키</Label>
              <StyledInput
                id="height"
                type="number"
                placeholder="cm 단위로 입력해주세요"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="weight">몸무게</Label>
              <StyledInput
                id="weight"
                type="number"
                placeholder="kg 단위로 입력해주세요"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="bodyFeatures">체형적 특징</Label>
              <HelpText>본인 실루엣 및 자신의 체형적 특징에 대해 알려주세요.</HelpText>
              <StyledTextarea
                id="bodyFeatures"
                placeholder="20자 이상 200자 이하로 작성해주세요"
                value={formData.bodyFeatures}
                onChange={(e) => setFormData({ ...formData, bodyFeatures: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>추천 받고 싶은 아이템</Label>
              <CheckboxGrid>
                {itemOptions.map((item) => (
                  <CheckboxItem key={item}>
                    <Checkbox
                      id={item}
                      checked={formData.recommendedItems.includes(item)}
                      onCheckedChange={(checked) => handleItemChange(item, checked as boolean)}
                    />
                    <Label htmlFor={item}>{item}</Label>
                  </CheckboxItem>
                ))}
              </CheckboxGrid>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="situation">어떤 상황에서 입고 싶은 옷인가요?</Label>
              <HelpText>출근복, 약복, 소개팅 등을 자세하게 알려주세요.</HelpText>
              <StyledTextarea
                id="situation"
                placeholder="20자 이상 200자 이하로 작성해주세요"
                value={formData.situation}
                onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="preferredStyle">추천받고 싶은 스타일</Label>
              <HelpText>원하는 스타일이나 선호하는 패션 스타일에 대해 알려주세요.</HelpText>
              <StyledTextarea
                id="preferredStyle"
                placeholder="예: 미니멀, 캐주얼, 오피스룩, 데이트룩 등 (20자 이상 200자 이하)"
                value={formData.preferredStyle}
                onChange={(e) => setFormData({ ...formData, preferredStyle: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="avoidStyle">피하고 싶은 스타일</Label>
              <HelpText>싫어하거나 피하고 싶은 스타일에 대해 알려주세요.</HelpText>
              <StyledTextarea
                id="avoidStyle"
                placeholder="예: 너무 화려한 패턴, 짧은 치마, 타이트한 옷 등 (20자 이상 200자 이하)"
                value={formData.avoidStyle}
                onChange={(e) => setFormData({ ...formData, avoidStyle: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="budget">예산</Label>
              <HelpText>스타일링에 사용할 수 있는 예산을 알려주세요.</HelpText>
              <StyledInput
                id="budget"
                placeholder="예: 30만원 이내, 50만원 정도"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>웹사이트 내의 콘텐츠 업로드에 동의하시나요?</Label>
              <CheckboxItem style={{ marginTop: "0.5rem" }}>
                <Checkbox
                  id="uploadConsent"
                  checked={formData.uploadConsent}
                  onCheckedChange={(checked) => setFormData({ ...formData, uploadConsent: checked as boolean })}
                />
                <Label htmlFor="uploadConsent">동의합니다</Label>
              </CheckboxItem>
            </FormGroup>

            <SubmitButton type="submit">스타일링 콘텐츠 신청하기</SubmitButton>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}

export default function ContentApplicationPage() {
  return (
    <AuthGuard requireAuth={true} message="스타일링 콘텐츠를 신청하려면 로그인이 필요합니다.">
      <ContentApplicationForm />
    </AuthGuard>
  )
}
