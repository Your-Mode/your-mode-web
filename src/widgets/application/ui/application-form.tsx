"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import styled from "@emotion/styled"

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

interface ApplicationFormProps {
  onSubmit: (formData: any) => void
  defaultValues?: {
    name: string
    bodyType: string
  }
}

export default function ApplicationForm({ onSubmit, defaultValues }: ApplicationFormProps) {
  const itemOptions = ["아우터", "상의", "하의", "가방", "신발", "악세서리", "기타"]

  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    bodyType: defaultValues?.bodyType || "",
    height: "",
    weight: "",
    bodyFeatures: "",
    recommendedItems: [] as string[],
    situation: "",
    uploadConsent: false,
  })

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
    onSubmit(formData)
  }

  return (
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
            readOnly={!!defaultValues?.name}
            style={defaultValues?.name ? { backgroundColor: "#f5f5f5" } : {}}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bodyType">체형</Label>
          <StyledInput
            id="bodyType"
            value={formData.bodyType}
            onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
            readOnly={!!defaultValues?.bodyType}
            style={defaultValues?.bodyType ? { backgroundColor: "#f5f5f5" } : {}}
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
  )
}
