"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import styled from "@emotion/styled"

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
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
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

const StyledInput = styled(Input)`
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
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

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;
  
  &:hover {
    background-color: #e62e5c;
  }
`

export default function SocialInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bodyType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 소셜 로그인 후 정보 저장 로직
    console.log("Social login info:", formData)
    router.push("/")
  }

  return (
    <MainContainer>
      <MainContent>
        <FormContainer>
          <Title>초기 정보 입력</Title>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <StyledInput
                id="name"
                placeholder="ex) 김모드"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">전화번호</Label>
              <StyledInput
                id="phone"
                placeholder="ex) 010-1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>체형 타입</Label>
              <RadioGroup
                value={formData.bodyType}
                onValueChange={(value) => setFormData({ ...formData, bodyType: value })}
                className="mt-2"
                required
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
                </RadioContainer>
              </RadioGroup>
              <HelpText>
                체형 타입을 모르시나요?
                <br />
                내진역 역세권 체형 타입 진단 온라인 분석기
              </HelpText>
            </FormGroup>

            <SubmitButton type="submit">가입하기</SubmitButton>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
