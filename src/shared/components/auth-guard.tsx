"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/src/shared/store/auth"
import LoginModal from "@/src/widgets/auth/ui/login-modal"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  message?: string
}

export default function AuthGuard({
  children,
  requireAuth = false,
  message = "이 기능을 이용하려면 로그인이 필요합니다.",
}: AuthGuardProps) {
  const { isLoggedIn } = useAuthStore()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (requireAuth && !isLoggedIn) {
      setShowMessage(true)
      setShowLoginModal(true)
    }
  }, [requireAuth, isLoggedIn])

  const handleCloseModal = () => {
    setShowLoginModal(false)
    setShowMessage(false)
  }

  if (requireAuth && !isLoggedIn) {
    return (
      <>
        <div
          style={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          >
            🔒
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            로그인이 필요합니다
          </h2>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "1.5rem",
            }}
          >
            {message}
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              background: "linear-gradient(to right, #f472b6, #ec4899)",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "9999px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            로그인하기
          </button>
        </div>

        <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} message={showMessage ? message : undefined} />
      </>
    )
  }

  return <>{children}</>
}
