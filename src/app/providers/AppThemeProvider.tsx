import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";
import { theme } from "@app/styles";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
