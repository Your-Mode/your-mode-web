"use client"

import type React from "react"
import AuthGuard from "@/src/shared/components/auth-guard"
import ContentApplicationForm from "@/src/widgets/application/ui/ContentApplicationForm";

export default function ContentApplicationPage() {
  return (
    <AuthGuard requireAuth={true} message="스타일링 콘텐츠를 신청하려면 로그인이 필요합니다.">
      <ContentApplicationForm />
    </AuthGuard>
  )
}
