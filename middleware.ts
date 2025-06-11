import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 미들웨어를 통한 라우팅 안정화
export function middleware(request: NextRequest) {
  // 클라이언트 사이드 라우팅 문제 해결을 위한 헤더 추가
  const response = NextResponse.next()

  // 캐시 관련 헤더 설정
  response.headers.set("Cache-Control", "no-store, must-revalidate")
  response.headers.set("Pragma", "no-cache")

  return response
}

// 모든 경로에 미들웨어 적용
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
