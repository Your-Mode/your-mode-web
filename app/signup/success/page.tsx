"use client"

import { Button } from "@/src/shared/components/ui/button"
import { CheckCircle, Sparkles, Heart } from "lucide-react"
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

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

const sparkle = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
`

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff3e6c 0%, #ff8e8e 50%, #ffc1cc 100%);
  padding-top: 4rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 0;
  }
`

const MainContent = styled.main`
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const SuccessContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
    border-radius: 12px;
  }
`

const IconContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  animation: ${bounce} 2s infinite;
`

const CheckIcon = styled(CheckCircle)`
  color: #10b981;
  filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));
`

const SparkleIcon = styled(Sparkles)`
  position: absolute;
  color: #fbbf24;
  animation: ${sparkle} 2s infinite;
  
  &:nth-of-type(1) {
    top: -10px;
    right: -10px;
    animation-delay: 0s;
  }
  
  &:nth-of-type(2) {
    bottom: -10px;
    left: -10px;
    animation-delay: 0.5s;
  }
  
  &:nth-of-type(3) {
    top: 10px;
    left: -15px;
    animation-delay: 1s;
  }
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
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

const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, #ff3e6c, #ff8e8e);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
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
  background: linear-gradient(135deg, #ff3e6c, #ff8e8e);
  border: none;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 62, 108, 0.3);
  }
`

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #ff3e6c;
  border: 2px solid #ff3e6c;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff3e6c;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 62, 108, 0.3);
  }
`

const FeatureList = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
`

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;
`

const HeartIcon = styled(Heart)`
  color: #ff3e6c;
  flex-shrink: 0;
`

export default function SignupSuccessPage() {
  return (
    <MainContainer>
      <MainContent>
        <SuccessContainer>
          <IconContainer>
            <CheckIcon size={80} />
            <SparkleIcon size={20} />
            <SparkleIcon size={16} />
            <SparkleIcon size={18} />
          </IconContainer>

          <Title>회원가입이 완료되었습니다!</Title>
          <Subtitle>
            유어모드에 오신 것을 환영합니다!
            <br />
            이제 나만의 스타일을 찾아보세요.
          </Subtitle>

          <WelcomeMessage>🎉 당신만의 패션 여정이 시작됩니다!</WelcomeMessage>

          <ButtonContainer>
            <Link href="/">
              <PrimaryButton>홈으로 이동</PrimaryButton>
            </Link>
            <Link href="/content-application">
              <SecondaryButton>컨텐츠 신청하기</SecondaryButton>
            </Link>
          </ButtonContainer>

          <FeatureList>
            <FeatureTitle>이제 이런 서비스를 이용할 수 있어요!</FeatureTitle>
            <FeatureItem>
              <HeartIcon size={16} />
              <span>AI 기반 체형 분석 및 맞춤 스타일링</span>
            </FeatureItem>
            <FeatureItem>
              <HeartIcon size={16} />
              <span>전문 에디터의 개인 맞춤 컨텐츠</span>
            </FeatureItem>
            <FeatureItem>
              <HeartIcon size={16} />
              <span>트렌드 분석 및 스타일링 팁</span>
            </FeatureItem>
            <FeatureItem>
              <HeartIcon size={16} />
              <span>체형별 맞춤 패션 추천</span>
            </FeatureItem>
          </FeatureList>
        </SuccessContainer>
      </MainContent>
    </MainContainer>
  )
}
