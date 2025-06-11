"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, User, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const SuccessContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
    border-radius: 16px;
  }
`

const IconContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  animation: ${pulse} 2s infinite;
`

const CheckIcon = styled(CheckCircle)`
  color: #10b981;
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));
`

const FloatingIcon = styled.div<{ delay: number }>`
  position: absolute;
  animation: ${float} 3s infinite;
  animation-delay: ${(props) => props.delay}s;
`

const PaletteIcon = styled(Palette)`
  color: #ff3e6c;
  position: absolute;
  top: -20px;
  right: -20px;
`

const UserIcon = styled(User)`
  color: #667eea;
  position: absolute;
  bottom: -15px;
  left: -15px;
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`

const ApplicationNumber = styled.div`
  background: linear-gradient(135deg, #ff3e6c, #ff8e8e);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  font-weight: 600;
`

const ProcessContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const ProcessTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #ff3e6c;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #ff3e6c;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`

const StepDescription = styled.div`
  font-size: 0.875rem;
  color: #666;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`

const ContactInfo = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
`

interface SuccessCardProps {
  applicationNumber: string
}

export default function SuccessCard({ applicationNumber }: SuccessCardProps) {
  return (
    <SuccessContainer>
      <IconContainer>
        <CheckIcon size={80} />
        <FloatingIcon delay={0}>
          <PaletteIcon size={24} />
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <UserIcon size={20} />
        </FloatingIcon>
      </IconContainer>

      <Title>스타일링 컨텐츠 신청 완료!</Title>
      <Subtitle>
        신청해주셔서 감사합니다!
        <br />
        전문 에디터가 맞춤형 스타일링을 준비하고 있어요.
      </Subtitle>

      <ApplicationNumber>📋 신청번호: {applicationNumber}</ApplicationNumber>

      <ProcessContainer>
        <ProcessTitle>
          <Clock size={20} />
          진행 과정 안내
        </ProcessTitle>

        <ProcessStep>
          <StepNumber>1</StepNumber>
          <StepContent>
            <StepTitle>신청 접수 완료</StepTitle>
            <StepDescription>고객님의 신청이 정상적으로 접수되었습니다.</StepDescription>
          </StepContent>
        </ProcessStep>

        <ProcessStep>
          <StepNumber>2</StepNumber>
          <StepContent>
            <StepTitle>에디터 배정 (1-2일)</StepTitle>
            <StepDescription>체형과 요청사항에 맞는 전문 에디터를 배정합니다.</StepDescription>
          </StepContent>
        </ProcessStep>

        <ProcessStep>
          <StepNumber>3</StepNumber>
          <StepContent>
            <StepTitle>맞춤 컨텐츠 제작 (3-5일)</StepTitle>
            <StepDescription>개인 맞춤형 스타일링 컨텐츠를 제작합니다.</StepDescription>
          </StepContent>
        </ProcessStep>

        <ProcessStep>
          <StepNumber>4</StepNumber>
          <StepContent>
            <StepTitle>컨텐츠 전달</StepTitle>
            <StepDescription>완성된 컨텐츠를 마이페이지에서 확인하실 수 있습니다.</StepDescription>
          </StepContent>
        </ProcessStep>
      </ProcessContainer>

      <ButtonContainer>
        <Link href="/mypage">
          <PrimaryButton>
            마이페이지 이동
            <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
          </PrimaryButton>
        </Link>
        <Link href="/contents">
          <SecondaryButton>다른 컨텐츠 보기</SecondaryButton>
        </Link>
      </ButtonContainer>

      <ContactInfo>
        <strong>📞 문의사항이 있으시나요?</strong>
        <br />
        고객센터: 010-1234-5678
        <br />
        이메일: yourmode@naver.com
        <br />
        평일 09:00 - 18:00 (주말 및 공휴일 휴무)
      </ContactInfo>
    </SuccessContainer>
  )
}
