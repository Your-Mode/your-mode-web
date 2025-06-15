"use client"

import { Button } from "@/src/shared/components/ui/button"
import { Edit, User, Mail } from "lucide-react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"

const ProfileHeaderContainer = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background.primary} 0%, ${({ theme }) => theme.colors.primary[50]} 100%);
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow.light};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.primary[100]} 0%, ${({ theme }) => theme.colors.primary[50]} 70%);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
  
  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`

const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const UserInfo = styled.div`
  flex: 1;
`

const UserName = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.text.primary} 0%, ${({ theme }) => theme.colors.primary[500]} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }
`

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.size.base};
  margin-bottom: 1.5rem;
  
  @media (max-width: 640px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`

const ActionButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.primary[500]};
  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary[100]};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
    border-color: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary[200]};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`

const UserStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
  
  @media (max-width: 640px) {
    gap: 1.5rem;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .value {
    font-size: ${({ theme }) => theme.fonts.size.xl};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  .label {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-top: 0.25rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
`

interface ProfileHeaderProps {
  name: string
  bodyType: string
  email: string
  stats: {
    customContents: number
    favorites: number
    comments: number
  }
}

export default function ProfileHeader({ name, bodyType, email, stats }: ProfileHeaderProps) {
  const router = useRouter()

  const handleEditClick = () => {
    router.push("/mypage/edit")
  }

  const handlePasswordClick = () => {
    router.push("/mypage/password")
  }

  return (
    <ProfileHeaderContainer>
      <ProfileInfo>
        <UserInfo>
          <UserName>{name}님의 마이페이지</UserName>
          <UserDetails>
            <DetailItem>
              <User size={16} />
              <span>체형: {bodyType}</span>
            </DetailItem>
            <DetailItem>
              <Mail size={16} />
              <span>{email}</span>
            </DetailItem>
          </UserDetails>

          <UserStats>
            <StatItem>
              <div className="value">{stats.customContents}</div>
              <div className="label">맞춤 컨텐츠</div>
            </StatItem>
            <StatItem>
              <div className="value">{stats.favorites}</div>
              <div className="label">찜한 컨텐츠</div>
            </StatItem>
            <StatItem>
              <div className="value">{stats.comments}</div>
              <div className="label">댓글</div>
            </StatItem>
          </UserStats>
        </UserInfo>

        <ButtonGroup>
          <ActionButton onClick={handleEditClick}>
            <Edit size={16} style={{ marginRight: "0.5rem" }} />
            기본정보 변경
          </ActionButton>
          <ActionButton onClick={handlePasswordClick}>비밀번호 변경</ActionButton>
        </ButtonGroup>
      </ProfileInfo>
    </ProfileHeaderContainer>
  )
}
