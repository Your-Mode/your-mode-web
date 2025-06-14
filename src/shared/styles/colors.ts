export const colors = {
  // Primary Colors
  primary: {
    50: "#fff5f7",
    100: "#ffe3e8",
    200: "#ffccd5",
    300: "#ffa3b3",
    400: "#ff708a",
    500: "#ff3e6c", // Main brand color
    600: "#e62e5c",
    700: "#cc1f4a",
    800: "#b31d42",
    900: "#9a1a3a",
  },

  // Neutral Colors
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // Semantic Colors
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Background Colors
  background: {
    primary: "#ffffff",
    secondary: "#fafafa",
    tertiary: "#f5f5f5",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text Colors
  text: {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999",
    inverse: "#ffffff",
    disabled: "#cccccc",
  },

  // Border Colors
  border: {
    light: "#eaeaea",
    medium: "#ddd",
    dark: "#999",
  },

  // Shadow Colors
  shadow: {
    light: "rgba(0, 0, 0, 0.05)",
    medium: "rgba(0, 0, 0, 0.1)",
    dark: "rgba(0, 0, 0, 0.15)",
  },
} as const

export type ColorsType = typeof colors
