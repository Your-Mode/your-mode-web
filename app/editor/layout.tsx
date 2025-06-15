"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/shared/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu"
import { Settings, Menu, LogOut, User, Home } from "lucide-react"
import Link from "next/link"
import styled from "@emotion/styled"

const EditorLayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Logo = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff3e6c;
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: #f8f9fa;
  color: #666;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    color: #ff3e6c;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    span {
      display: none;
    }
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: #333;
`

const UserRole = styled.span`
  font-size: 0.75rem;
  color: #666;
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`

const MobileMenuButton = styled(Button)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // 로그아웃 로직
    console.log("Logout")
    // 메인 사이트로 리다이렉트
    window.location.href = "/"
  }

  return (
    <EditorLayoutContainer>
      <Header>
        <LeftSection>
          <MobileMenuButton variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={20} />
          </MobileMenuButton>

          <Logo href="/editor">YOUR MODE Editor</Logo>

          <HomeButton href="/">
            <Home size={16} />
            <span>메인 사이트</span>
          </HomeButton>
        </LeftSection>

        <UserSection>
          <UserInfo>
            <UserName>에디터</UserName>
            <UserRole>컨텐츠 에디터</UserRole>
          </UserInfo>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>프로필</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>설정</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  <span>메인 사이트로</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </UserSection>
      </Header>

      <MainContent>{children}</MainContent>
    </EditorLayoutContainer>
  )
}
