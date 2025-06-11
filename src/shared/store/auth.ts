import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
    email: string
  } | null
  login: (user: { name: string; email: string }) => void
  logout: () => void
  toggleLogin: () => void // 개발용
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      toggleLogin: () => {
        const { isLoggedIn } = get()
        if (isLoggedIn) {
          set({ isLoggedIn: false, user: null })
        } else {
          set({
            isLoggedIn: true,
            user: { name: "홍길동", email: "hong@example.com" },
          })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
