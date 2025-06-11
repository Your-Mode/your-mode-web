"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem 4rem 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem 4rem 2rem;
  }
`

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
  min-height: 120px;
  
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;
  
  &:hover {
    background-color: #e62e5c;
  }
`

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // 문의 처리 로직
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.")
  }

  return (
    <MainContainer>
      <MainContent>
        <PageTitle>문의하기</PageTitle>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <StyledInput
                id="name"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">이메일</Label>
              <StyledInput
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">제목</Label>
              <StyledInput
                id="subject"
                placeholder="문의 제목을 입력해주세요"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">문의 내용</Label>
              <StyledTextarea
                id="message"
                placeholder="문의 내용을 자세히 입력해주세요"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">문의 보내기</SubmitButton>
          </Form>
        </FormContainer>
      </MainContent>
    </MainContainer>
  )
}
