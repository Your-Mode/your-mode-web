"use client"

import type React from "react"
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"
import { theme } from "@/src/shared/styles/theme"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
}
