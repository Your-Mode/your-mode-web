"use client"

import Link from "next/link"
import styled from "@emotion/styled"
import IcThreads from "@/src/shared/assets/ic/ic-threads.svg"
import ImgNaverBlog from "@/src/shared/assets/img/img-naver-blog.png"
import Image from "next/image";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: 2rem 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
`

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const CompanyName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.fonts.lineHeight.snug};
  margin: 0;
`

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
`

const SocialIcon = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
`

const QuickLinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`

const QuickLink = styled(Link)`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`

const FooterBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

const LegalLink = styled(Link)`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <CompanyInfo>
            <CompanyName>(주)유어모드</CompanyName>
            <InfoText>사업자등록번호: 340-08-03240 | 대표: 전여진</InfoText>
            <InfoText>경기 고양시 일산동구 고봉로 32-19 남정씨티프라자7차 303~305호 내부 3호실</InfoText>
            <InfoText>고객센터: 010-6415-1548 | 이메일: urmode@naver.com</InfoText>
          </CompanyInfo>

          <SocialSection>
            <SocialIcons>
              <SocialIcon aria-label="카카오톡" />
              <SocialIcon aria-label="네이버">
                <Image src={ImgNaverBlog} alt="" width={36} height={36} />
              </SocialIcon>
              <SocialIcon aria-label="스레드">
                <Image src={IcThreads} alt="" width={36} height={36} />
              </SocialIcon>
            </SocialIcons>
          </SocialSection>

          <QuickLinksSection>
            <QuickLink href="/faq">자주 묻는 질문</QuickLink>
            <QuickLink href="/contact">문의하기</QuickLink>
          </QuickLinksSection>
        </FooterMain>

        <FooterBottom>
          <LegalLink href="/policy/term">서비스 이용약관</LegalLink>
          <LegalLink href="/policy/privacy">개인정보 처리 방침</LegalLink>
          <LegalLink href="/policy/copyright">저작권 정책</LegalLink>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}
