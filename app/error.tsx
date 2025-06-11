"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 오류 로깅
    console.error(error)
  }, [error])

  const handleReset = () => {
    if (typeof reset === "function") {
      reset()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
      <p className="text-gray-600 mb-6 text-center">페이지를 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      <div className="flex gap-4">
        <Button onClick={handleReset} variant="outline">
          다시 시도
        </Button>
        <Button onClick={() => (window.location.href = "/")}>홈으로 돌아가기</Button>
      </div>
    </div>
  )
}
