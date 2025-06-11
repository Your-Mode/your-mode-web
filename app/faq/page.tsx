"use client"

import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 800px;
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

const FAQContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

const FAQItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 1.5rem 0;
  
  &:last-child {
    border-bottom: none;
  }
`

const Question = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`

export default function FAQPage() {
  const faqs = [
    {
      question: "체형 진단은 어떻게 이루어지나요?",
      answer:
        "AI 기반의 체형 분석 시스템을 통해 사용자의 신체 정보와 사진을 분석하여 스트레이트, 웨이브, 내추럴 중 가장 적합한 체형을 진단해드립니다.",
    },
    {
      question: "컨텐츠 신청 후 얼마나 기다려야 하나요?",
      answer: "컨텐츠 신청 후 평균 3-5일 내에 전문 에디터가 맞춤형 스타일링 컨텐츠를 제작하여 제공해드립니다.",
    },
    {
      question: "회원가입 시 입력한 정보는 안전한가요?",
      answer: "고객님의 개인정보는 철저한 보안 시스템을 통해 안전하게 보호되며, 개인정보 처리방침에 따라 관리됩니다.",
    },
    {
      question: "체형이 바뀌면 어떻게 하나요?",
      answer:
        "마이페이지에서 언제든지 체형 정보를 수정할 수 있으며, 변경된 정보에 맞는 새로운 컨텐츠를 추천받으실 수 있습니다.",
    },
  ]

  return (
    <MainContainer>
      <MainContent>
        <PageTitle>자주 묻는 질문</PageTitle>
        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <Question>{faq.question}</Question>
              <Answer>{faq.answer}</Answer>
            </FAQItem>
          ))}
        </FAQContainer>
      </MainContent>
    </MainContainer>
  )
}
