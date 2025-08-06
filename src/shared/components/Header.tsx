"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import LoginModal from "@/src/widgets/auth/ui/login-modal"
import SignupMethodModal from "@/src/widgets/auth/ui/signup-method-modal"
import { useAuthStore } from "@/src/shared/store/auth"
import styled from "@emotion/styled"

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 80px; /* 고정 높이 설정 */
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  min-height: 80px; /* 고정 높이 설정 */
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 70px; /* 모바일에서 약간 작게 */
  }
`

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 48px; /* 최소 높이 보장 */
  
  @media (max-width: 768px) {
    min-height: 38px;
  }
`

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.6rem;
    flex-wrap: nowrap;
  }
  
  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`

const NavLink = styled.a<{ isActive?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.wide};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary[500] : theme.colors.text.primary)};
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
  
  ${({ isActive, theme }) =>
    isActive &&
    `
    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${theme.colors.primary[500]};
    }
  `}
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.normal};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    letter-spacing: 0;
  }
`

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  min-height: 48px; /* 고정 높이 설정 */
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    min-width: fit-content;
    min-height: 38px;
  }
  
  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`

const AuthLink = styled.button`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  white-space: nowrap;
  padding: 0.75rem 0.5rem; /* 패딩을 늘려서 높이 확보 */
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    padding: 0.6rem 0.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.5rem 0.3rem;
  }
`

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 48px; /* 고정 높이 설정 */
  
  @media (max-width: 768px) {
    min-height: 38px;
  }
`

const UserName = styled.span`
  font-size: 0.875rem;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem;
  }
`

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
  
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.2s ease;
  margin-top: 0.5rem;
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
  
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }
  
  &:only-child {
    border-radius: 8px;
  }
`

const DropdownLink = styled.a`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
  
  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
`

const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`

const ModalText = styled.p`
  margin: 0 0 2rem 0;
  color: #666;
  line-height: 1.5;
`

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const ModalButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) =>
    variant === "primary"
      ? `
        background-color: #ef4444;
        color: white;
        &:hover {
          background-color: #dc2626;
        }
      `
      : `
        background-color: #f3f4f6;
        color: #374151;
        &:hover {
          background-color: #e5e7eb;
        }
      `}
`

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupMethodOpen, setIsSignupMethodOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { isLoggedIn, user, logout } = useAuthStore()

  const isHomeActive = pathname === "/"
  const isContentsActive = pathname.startsWith("/contents") || pathname.startsWith("/content/")
  const isEditorContentsActive = pathname.startsWith("/editor-contents")
  const isAboutActive = pathname.startsWith("/about")

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogoutConfirm = () => {
    logout()
    setShowLogoutConfirm(false)
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  const handleSignupClick = () => {
    setIsSignupMethodOpen(true)
  }

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleMypageClick = () => {
    setIsDropdownOpen(false)
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <NavContainer>
            <NavLinks>
              <Link href="/" passHref legacyBehavior>
                <NavLink isActive={isHomeActive}>YOUR MODE</NavLink>
              </Link>
              <Link href="/contents" passHref legacyBehavior>
                <NavLink isActive={isContentsActive}>CONTENTS</NavLink>
              </Link>
              <Link href="/editor-contents" passHref legacyBehavior>
                <NavLink isActive={isEditorContentsActive}>EDITOR</NavLink>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <NavLink isActive={isAboutActive}>ABOUT</NavLink>
              </Link>
            </NavLinks>
            <AuthLinks>
              {isLoggedIn ? (
                <ProfileContainer ref={dropdownRef}>
                  <UserName>{user?.name}님</UserName>
                  <ProfileButton onClick={handleProfileClick}>
                    <ProfileIcon>
                      <User size={16} />
                    </ProfileIcon>
                  </ProfileButton>
                  <DropdownMenu isOpen={isDropdownOpen}>
                    <Link href="/mypage" passHref legacyBehavior>
                      <DropdownLink onClick={handleMypageClick}>마이페이지</DropdownLink>
                    </Link>
                    <DropdownItem onClick={handleLogoutClick}>로그아웃</DropdownItem>
                  </DropdownMenu>
                </ProfileContainer>
              ) : (
                <>
                  <AuthLink onClick={() => setIsLoginOpen(true)}>로그인</AuthLink>
                  <AuthLink onClick={handleSignupClick}>회원가입</AuthLink>
                </>
              )}
            </AuthLinks>
          </NavContainer>
        </HeaderContent>
      </HeaderContainer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <SignupMethodModal isOpen={isSignupMethodOpen} onClose={() => setIsSignupMethodOpen(false)} />

      {/* 로그아웃 확인 모달 */}
      {showLogoutConfirm && (
        <ModalOverlay onClick={handleLogoutCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>로그아웃</ModalTitle>
            <ModalText>정말 로그아웃하시겠습니까?</ModalText>
            <ModalButtons>
              <ModalButton variant="secondary" onClick={handleLogoutCancel}>
                아니요
              </ModalButton>
              <ModalButton variant="primary" onClick={handleLogoutConfirm}>
                네
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}
