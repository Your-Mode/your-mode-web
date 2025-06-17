"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styled from "@emotion/styled"
import { useAuthStore } from "@/src/shared/store/auth"
import AdditionalInfoForm from "@/src/widgets/auth/ui/AdditionalInfo/AdditionalInfoForm";

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 2rem;
`

const MainContent = styled.main`
  max-width: 28rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

interface FormData {
  name: string
  phone: string
  height: string
  weight: string
  gender: string
  bodyType: string // 다시 string으로 변경
  termsAgreed: boolean
  privacyAgreed: boolean
  marketingAgreed: boolean
}

const bodyTypeOptions = [
  { value: "straight", label: "스트레이트" },
  { value: "wave", label: "웨이브" },
  { value: "natural", label: "내추럴" },
  { value: "unknown", label: "잘 모르겠어요" },
]

const categoryOptions = [
  { value: "casual", label: "캐주얼" },
  { value: "business", label: "비즈니스" },
  { value: "formal", label: "포멀" },
  { value: "street", label: "스트릿" },
  { value: "vintage", label: "빈티지" },
  { value: "minimal", label: "미니멀" },
  { value: "romantic", label: "로맨틱" },
  { value: "sporty", label: "스포티" },
]

export default function AdditionalInfoPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
    bodyType: "", // 빈 문자열로 변경
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    // Validation
    if (!formData.name) newErrors.name = "이름을 입력해주세요"
    if (!formData.phone) newErrors.phone = "전화번호를 입력해주세요"
    if (!formData.height) newErrors.height = "키를 입력해주세요"
    if (!formData.weight) newErrors.weight = "몸무게를 입력해주세요"
    if (!formData.gender) newErrors.gender = "성별을 선택해주세요"
    if (!formData.bodyType) newErrors.bodyType = "체형을 선택해주세요"
    if (!formData.termsAgreed) newErrors.termsAgreed = "서비스 이용약관에 동의해주세요"
    if (!formData.privacyAgreed) newErrors.privacyAgreed = "개인정보 처리방침에 동의해주세요"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Success - redirect to success page
    login({
      name: formData.name,
      email: "social@example.com",
    })
    router.push("/signup/success")
  }

  return (
    <MainContainer>
      <MainContent>
        <AdditionalInfoForm />
      </MainContent>
    </MainContainer>
  )
}
