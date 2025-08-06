"use client";

import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/src/app/providers/theme-provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "@/src/shared/components/Header";
import Footer from "@/src/shared/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEditorPage = pathname?.startsWith("/editor") && !pathname?.startsWith("/editor-contents");

  // 페이지 이동 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {!isEditorPage && <Header />}
        <main style={{ flex: 1 }}>{children}</main>
        {!isEditorPage && <Footer />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
