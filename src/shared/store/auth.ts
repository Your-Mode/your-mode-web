import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  user: {
    name: string
    email: string
  } | null;
  login: (accessToken: string, user: { name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      login: (accessToken, user) => set({ isLoggedIn: true, user: user, accessToken: accessToken }),
      logout: () => set({ isLoggedIn: false, user: null, accessToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
