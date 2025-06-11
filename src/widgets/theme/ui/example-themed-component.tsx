"use client"

import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow.medium};
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
`

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  margin-bottom: 2rem;
`

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`

const ColorSwatch = styled.div<{ color: string }>`
  width: 100%;
  height: 60px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`

export default function ExampleThemedComponent() {
  const theme = useTheme()

  return (
    <Container>
      <Title>테마 시스템 예시</Title>
      <Subtitle>
        Emotion과 TypeScript를 사용한 테마 시스템입니다. 컬러, 폰트, 그리고 다양한 디자인 토큰을 일관성 있게 관리할 수
        있습니다.
      </Subtitle>

      <Button onClick={() => console.log("Theme:", theme)}>테마 정보 확인</Button>

      <ColorPalette>
        <ColorSwatch color={theme.colors.primary[500]}>Primary</ColorSwatch>
        <ColorSwatch color={theme.colors.success[500]}>Success</ColorSwatch>
        <ColorSwatch color={theme.colors.warning[500]}>Warning</ColorSwatch>
        <ColorSwatch color={theme.colors.error[500]}>Error</ColorSwatch>
        <ColorSwatch color={theme.colors.info[500]}>Info</ColorSwatch>
      </ColorPalette>
    </Container>
  )
}
