import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 이미지 URL 정규화 함수 추가
export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg?height=300&width=400"

  // 이미 정규화된 URL인 경우 그대로 반환
  if (url.startsWith("http") || url.startsWith("/")) {
    return url
  }

  // 상대 경로를 절대 경로로 변환
  return `/${url}`
}

// 클라이언트 사이드 라우팅 안정화 함수
export function safeNavigate(path: string) {
  // 현재 URL과 동일한 경로로 이동하는 경우 페이지 새로고침
  if (window.location.pathname === path) {
    window.location.href = path
    return
  }

  // 그 외의 경우 일반 라우팅
  window.location.href = path
}
