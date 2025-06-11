"use client"

import { useState } from "react"
import { useAuthStore } from "@/src/shared/store/auth"

const Header = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { isLoggedIn, user, toggleLogin, logout } = useAuthStore()

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          My App
        </a>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user?.name || "사용자"} 님</span>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={toggleLogin}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            DEV
          </button>
        )}

        {showLogoutConfirm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md">
              <p className="mb-4">로그아웃 하시겠습니까?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded-md">
                  아니오
                </button>
                <button
                  onClick={() => {
                    logout()
                    setShowLogoutConfirm(false)
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  예
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
